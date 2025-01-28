---
created: 2024-07-24T16:53:03 (UTC -05:00)
tags: [dotnet,aws,blazor,webdev,software,coding,development,engineering,inclusive,community]
source: https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g
author: 
---

# .NET7 Blazor Server app in AWS ECS - DEV Community

source: https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g

> ## Excerpt
> What is Blazor?   In simple terms, Blazor is a Single Page Application development framework...

---
## [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#what-is-blazor)What is Blazor?

In simple terms, Blazor is a Single Page Application development framework provided and owned by the .NET foundation. Blazor uses the power of .NET and C# to build full-stack web apps without writing a line of JavaScript. Blazor can run anywhere such as client browsers on WASM, server-side on ASP.NET core, or in the native client apps such as mobile or desktop apps.

In this post, we are going to create a sample Blazor Server SPA application, build it as a docker image and push it to AWS and deploy it there.

## [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#what-is-the-blazor-server-hosting-model)What is the Blazor Server hosting model?

Blazor server application means the web application is executed on the server side instead of in a browser. ASP.NET Core apps can be configured to use Blazor Server as the hosting model. A SignalR connection using WebSockets will be created for each tab in the client browser which will be responsible for updating UI content and handling events. Blazor allows the scaling apps to handle multiple client connections.

The state on the server associated with each connected client is called a circuit. Circuits don't get tied to a specific network connection and can tolerate - temporarily - interrupted connections. In addition, clients can reconnect to the server when they want to even after going offline.

To know more about Blazor hosting models, please go through the [official documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-7.0) from the Microsoft

Let's start with work!  
What we gonna do here is,

1.  Create a sample Blazor Server App in VS2022
2.  Adding a docker file
3.  Build the Blazor server app as an image and push it to AWS ECR.
4.  Create Networking Infrastructure in AWS using Cloudformation.
5.  Create ECS cluster, services, and task definitions to deploy the Blazor server app.
6.  Test the application.

### [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#creating-blazor-server-sample-app)Creating Blazor Server sample app

First, open visual studio 2022 and go to create project option. In the templates, choose the Blazor Server app.

[![Project Templates](https://res.cloudinary.com/practicaldev/image/fetch/s--kE_59IhU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/te74g0dibfe81iq7pxw2.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--kE_59IhU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/te74g0dibfe81iq7pxw2.png)

Then, choose the directories to save the project and then press next. Now it's time to choose the .NET SDK version. I have .NET7 installed, so, I'm choosing the same and press next.

[![Dotnet SDK Version](https://res.cloudinary.com/practicaldev/image/fetch/s--vpQ4n6e8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ye23advln1on0edtwnb.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--vpQ4n6e8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ye23advln1on0edtwnb.png)

That's it. The sample application is created now. Press "CTRL+F5" to run the application locally. If you see the below page in your default browser, then everything is working as expected.

[![Application locally running](https://res.cloudinary.com/practicaldev/image/fetch/s--K1QY1fXH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mmhnr6ogs4k52pl84b2b.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--K1QY1fXH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mmhnr6ogs4k52pl84b2b.png)

### [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#adding-dockerfile)Adding Dockerfile

Now it's time to build and push the application as a docker image into AWS ECR. To do that, we need to do a couple of things. First, we need to add a Dockerfile in our project folder that helps docker to build an image step by step.

I'm gonna create a folder called "buildScripts" and inside that, I create a file "Dockerfile" with the below contents on it.  

```
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://*:8000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BlazorSampleApp.csproj", "."]
RUN dotnet restore "./BlazorSampleApp.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BlazorSampleApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BlazorSampleApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BlazorSampleApp.dll"]
```

If you have noted, I'm exposing the application inside the container in port 8000.

## [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#build-the-docker-image-and-push-it-to-aws-ecr)Build the Docker image and push it to AWS ECR

Now, I'm gonna build and push the application as a docker container image into AWS ECR. Before that, we need to configure the AWS account on our machine.

To do that, we need the latest AWS CLI installed on our PC. I do have AWS CLI V2 installed already. If you don't, get the latest version [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

To verify the installation of AWS, press `aws --version` in the command prompt. It will tell you the correct version number if that is installed perfectly.

To configure, Open the command prompt and type `aws configure` and press enter. Now it will ask for Access ID, Key, default region, and output. Give the appropriate inputs and press enter so that it will be configured.

[![AWS Cred](https://res.cloudinary.com/practicaldev/image/fetch/s--KrLGPVy2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrwjqmagn4d2o1yc8rhm.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--KrLGPVy2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrwjqmagn4d2o1yc8rhm.png)

Now, we will create an ECR repository in the AWS by running the below command in the command prompt.

`aws ecr create-repository --repository-name blazorserverapp`

The successful response of this command will give you the full repository Uri. We will use the Uri to tag our docker image during the application build stage.

Running the below commands from the Blazor application project root directory will login your aws cli into ECR, build & tag the docker image and push it.  

```
aws ecr get-login-password --region {your-default-region} | docker login --username AWS --password-stdin {your-aws-account-id}.dkr.ecr.{your-default-region}.amazonaws.com

docker build -t {your-aws-account-id}.dkr.ecr.{your-default-region}.amazonaws.com/blazorserverapp:latest -f buildScripts\Dockerfile .

docker push {your-aws-account-id}.dkr.ecr.{your-default-region}.amazonaws.com/blazorserverapp:latest

```

## [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#create-networking-infrastructure-in-aws)Create Networking Infrastructure in AWS

Our next step is to deploy the container image we pushed just now into Amazon ECS. To do that, We are gonna set up our own networks first such as VPC, Subnets, etc. We are going to create a VPC, 2 public subnets, 2 private subnets, a public load balancer, a private load balancer, and its associated resources.

We will deploy our Blazor application container image inside the public subnets which are inside the VPC. We'll use the AWS Cloudformation service to create our resources.

Add the below cloudformation template as "ecs-infra.yaml" inside the buildscripts folder  

```
AWSTemplateFormatVersion: 2010-09-09
Description: This stack creates a VPC with 3 public subnets and private subnets.
  Then, it will create a public load balancer and private load balancer. Public LB is publicly accessable where as
  private LB will be accessible within the service that deployed inside private subnets.
  The docker containers will be deployed in Fargate ECS clusters. It will be deployed in either public subnets and associate
  with public LB listeres or in private subnets and associate with private LB

Parameters:
  VPCCIDR:
    Type: String
    Description: CIDR value for the VPC.
    Default: "10.0.0.0/16"
  PublicSubnet1CIDR:
    Type: String
    Description: CIDR value for the public subnet 1.
    Default: "10.0.0.0/24"
  PublicSubnet2CIDR:
    Type: String
    Description: CIDR value for the public subnet 2.
    Default: "10.0.1.0/24"
  PrivateSubnet1CIDR:
    Type: String
    Description: CIDR value for the private subnet 1.
    Default: "10.0.3.0/24"
  PrivateSubnet2CIDR:
    Type: String
    Description: CIDR value for the private subnet 2.
    Default: "10.0.4.0/24"
  PublicLoadBalancerName:
    Type: String
    Description: Name of the public application load balancer the blazorserverapp application will use for
  PrivateLoadBalancerName:
    Type: String
    Description: Name of the private application load balancer the blazorserverapp containers inside ecs taske will use for its communication with other containers
  ECSClusterName:
    Type: String
    Description: Name of the ecs cluster that borker 2 application uses to deploy its microservices

Resources:
  # VPC in which containers will be networked.
  # It has two public subnets, and two private subnets.
  # We distribute the subnets across the first two available subnets
  # for the region, for high availability.
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      EnableDnsSupport: true
      EnableDnsHostnames: true
      CidrBlock: !Ref VPCCIDR
      Tags:
        - Key: Name
          Value: blazorserverapp-vpc

  # Two public subnets, where containers can have public IP addresses
  PublicSubnetOne:
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Select [0, Fn::GetAZs: !Ref "AWS::Region"]
      VpcId: !Ref "VPC"
      CidrBlock: !Ref PublicSubnet1CIDR
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: blazorserverapp-pub-sub1

  PublicSubnetTwo:
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Select [1, Fn::GetAZs: !Ref "AWS::Region"]
      VpcId: !Ref "VPC"
      CidrBlock: !Ref PublicSubnet2CIDR
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: blazorserverapp-pub-sub2

  # Theree private subnets where containers will only have private
  # IP addresses, and will only be reachable by other members of the
  # VPC
  PrivateSubnetOne:
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Select [0, Fn::GetAZs: !Ref "AWS::Region"]
      VpcId: !Ref "VPC"
      CidrBlock: !Ref PrivateSubnet1CIDR
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: blazorserverapp-pri-sub1

  PrivateSubnetTwo:
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone: !Select [1, Fn::GetAZs: !Ref "AWS::Region"]
      VpcId: !Ref "VPC"
      CidrBlock: !Ref PrivateSubnet2CIDR
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: blazorserverapp-pri-sub2

  # Setup networking resources for the public subnets.
  # Containers in the public subnets have public IP addresses and the routing table
  # sends network traffic via the internet gateway.
  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: blazorserverapp-vpc-igw

  GatewayAttachement:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref "VPC"
      InternetGatewayId: !Ref "InternetGateway"

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref "VPC"
      Tags:
        - Key: Name
          Value: blazorserverapp-pub-route-tbl

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: GatewayAttachement
    Properties:
      RouteTableId: !Ref "PublicRouteTable"
      DestinationCidrBlock: "0.0.0.0/0"
      GatewayId: !Ref "InternetGateway"

  PublicSubnetOneRouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnetOne
      RouteTableId: !Ref PublicRouteTable

  PublicSubnetTwoRouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnetTwo
      RouteTableId: !Ref PublicRouteTable

  # Setup networking resources for the private subnets.
  # Containers in these subnets have only private IP addresses, and must use a NAT
  # gateway to talk to the internet. We launch two NAT gateways, one for
  # each private subnet.
  NatGatewayOneAttachment:
    Type: AWS::EC2::EIP
    DependsOn: GatewayAttachement
    Properties:
      Domain: vpc
  NatGatewayTwoAttachment:
    Type: AWS::EC2::EIP
    DependsOn: GatewayAttachement
    Properties:
      Domain: vpc
  NatGatewayOne:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NatGatewayOneAttachment.AllocationId
      SubnetId: !Ref PublicSubnetOne
      Tags:
        - Key: Name
          Value: blazorserverapp-nat1
  NatGatewayTwo:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NatGatewayTwoAttachment.AllocationId
      SubnetId: !Ref PublicSubnetTwo
      Tags:
        - Key: Name
          Value: blazorserverapp-nat2

  PrivateRouteTableOne:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref "VPC"
  PrivateRouteOne:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTableOne
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NatGatewayOne
  PrivateRouteTableOneAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PrivateRouteTableOne
      SubnetId: !Ref PrivateSubnetOne
  PrivateRouteTableTwo:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref "VPC"
  PrivateRouteTwo:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTableTwo
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NatGatewayTwo
  PrivateRouteTableTwoAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PrivateRouteTableTwo
      SubnetId: !Ref PrivateSubnetTwo

  PublicLoadBalancerSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: public internet access to the load balancer
      VpcId: !Ref "VPC"
      SecurityGroupIngress:
        - CidrIp: 0.0.0.0/0
          IpProtocol: "tcp"
          Description: "Allow HTTP Request from anywhere in the internet"
          FromPort: 80
          ToPort: 80
        - CidrIp: 0.0.0.0/0
          Description: "Allow HTTPS Request from anywhere in the internet"
          IpProtocol: "tcp"
          FromPort: 443
          ToPort: 443
      Tags:
        - Key: Name
          Value: blazorserverapp-pub-lb-access-sg

  PublicLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: !Ref PublicLoadBalancerName
      Scheme: internet-facing
      LoadBalancerAttributes:
        - Key: idle_timeout.timeout_seconds
          Value: "30"
      Subnets:
        # The load balancer is placed into the public subnets, so that traffic
        # from the internet can reach the load balancer directly via the internet gateway
        - !Ref PublicSubnetOne
        - !Ref PublicSubnetTwo
      SecurityGroups: [!Ref "PublicLoadBalancerSG"]

  # A dummy target group is used to setup the ALB to just drop traffic
  # initially, before any real service target groups have been added.
  DummyTargetGroupPublic:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckIntervalSeconds: 60
      HealthCheckPath: /
      HealthCheckProtocol: HTTP
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      Name: blazorserverapp-default-public
      Port: 80
      Protocol: HTTP
      UnhealthyThresholdCount: 10
      VpcId: !Ref "VPC"

  PublicLoadBalancerListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    DependsOn:
      - PublicLoadBalancer
    Properties:
      DefaultActions:
        - TargetGroupArn: !Ref "DummyTargetGroupPublic"
          Type: "forward"
      LoadBalancerArn: !Ref "PublicLoadBalancer"
      Port: 80
      Protocol: HTTP

  # An internal load balancer, this would be used for a service that is not
  # directly accessible to the public, but instead should only receive traffic
  # from your other services.
  PrivateLoadBalancerSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Restricted access to load balancer
      VpcId: !Ref "VPC"
      Tags:
        - Key: Name
          Value: blazorserverapp-pri-lb-access-sg

  PrivateLoadBalancerIngressFromECS:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      Description: Only accept traffic from a container in the fargate container security group
      GroupId: !Ref "PrivateLoadBalancerSG"
      IpProtocol: "-1"
      SourceSecurityGroupId: !Ref "FargateContainerSecurityGroup"

  PrivateLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: !Ref PrivateLoadBalancerName
      Scheme: internal
      LoadBalancerAttributes:
        - Key: idle_timeout.timeout_seconds
          Value: "30"
      Subnets:
        # This load balancer is put into the private subnet, so that there is no
        # route for the public to even be able to access the private load balancer.
        - !Ref PrivateSubnetOne
        - !Ref PrivateSubnetTwo
      SecurityGroups: [!Ref "PrivateLoadBalancerSG"]

  # This dummy target group is used to setup the ALB to just drop traffic
  # initially, before any real service target groups have been added.
  DummyTargetGroupPrivate:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckIntervalSeconds: 60
      HealthCheckPath: /
      HealthCheckProtocol: HTTP
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      Name: blazorserverapp-default-private
      Port: 80
      Protocol: HTTP
      UnhealthyThresholdCount: 10
      VpcId: !Ref "VPC"

  PrivateLoadBalancerListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    DependsOn:
      - PrivateLoadBalancer
    Properties:
      DefaultActions:
        - TargetGroupArn: !Ref "DummyTargetGroupPrivate"
          Type: "forward"
      LoadBalancerArn: !Ref "PrivateLoadBalancer"
      Port: 80
      Protocol: HTTP

  # A security group for the containers we will run in Fargate.
  # Two rules, allowing network traffic from a public facing load
  # balancer, a private internal load balancer, and from other members
  # of the security group.
  #
  # Remove any of the following ingress rules that are not needed.
  FargateContainerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Access to the Fargate containers
      VpcId: !Ref "VPC"
      Tags:
        - Key: Name
          Value: blazorserverapp-ecs-container-sg

  EcsSecurityGroupIngressFromPublicALB:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      Description: Ingress from the public ALB
      GroupId: !Ref "FargateContainerSecurityGroup"
      IpProtocol: "-1"
      SourceSecurityGroupId: !Ref "PublicLoadBalancerSG"

  EcsSecurityGroupIngressFromPrivateALB:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      Description: Ingress from the private ALB
      GroupId: !Ref "FargateContainerSecurityGroup"
      IpProtocol: "-1"
      SourceSecurityGroupId: !Ref "PrivateLoadBalancerSG"

  EcsSecurityGroupIngressFromSelf:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      Description: Ingress from other containers in the same security group
      GroupId: !Ref "FargateContainerSecurityGroup"
      IpProtocol: "-1"
      SourceSecurityGroupId: !Ref "FargateContainerSecurityGroup"

  ECSCluster:
    DependsOn:
      - PublicLoadBalancer
      - PrivateLoadBalancer
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: !Ref ECSClusterName
      ClusterSettings:
        - Name: containerInsights
          Value: enabled

Outputs:
  InternalUrl:
    Description: The url of the internal load balancer
    Value: !Join ["", ["http://", !GetAtt "PrivateLoadBalancer.DNSName"]]
    Export:
      Name: InternalUrl
  ExternalUrl:
    Description: The url of the external load balancer
    Value: !Join ["", ["http://", !GetAtt "PublicLoadBalancer.DNSName"]]
    Export:
      Name: ExternalUrl
  VPCId:
    Description: The ID of the VPC that this stack is deployed in
    Value: !Ref "VPC"
    Export:
      Name: VPC
  PublicSubnetOne:
    Description: Public subnet one
    Value: !Ref "PublicSubnetOne"
    Export:
      Name: PublicSubnetOne
  PublicSubnetTwo:
    Description: Public subnet two
    Value: !Ref "PublicSubnetTwo"
    Export:
      Name: PublicSubnetTwo
  PrivateSubnetOne:
    Description: Private subnet one
    Value: !Ref "PrivateSubnetOne"
    Export:
      Name: PrivateSubnetOne
  PrivateSubnetTwo:
    Description: Private subnet two
    Value: !Ref "PrivateSubnetTwo"
    Export:
      Name: PrivateSubnetTwo
  FargateContainerSecurityGroup:
    Description: The security group to be used by blazorserverapp containers
    Value: !Ref FargateContainerSecurityGroup
    Export:
      Name: FargateContainerSecurityGroup
  ClusterName:
    Description: The name of the ECS cluster created for blazorserverapp applications
    Value: !Ref "ECSCluster"
    Export:
      Name: ClusterName
  PublicLoadBalancerListener:
    Description: Listener for the load balancer exposed to the public internet
    Value: !Ref PublicLoadBalancerListener
    Export:
      Name: PublicListener
  PrivateLoadBalancerListener:
    Description: Listener for the load balancer exposed internally inside the VPC
    Value: !Ref PrivateLoadBalancerListener
    Export:
      Name: PrivateListener

```

In a same way, Add the below configuration template as "ecs-infra.json" inside the buildscripts folder  

```
[
  {
    "ParameterKey": "VPCCIDR",
    "ParameterValue": "11.200.13.0/24"
  },
  {
    "ParameterKey": "PublicSubnet1CIDR",
    "ParameterValue": "11.200.13.0/26"
  },
  {
    "ParameterKey": "PublicSubnet2CIDR",
    "ParameterValue": "11.200.13.64/26"
  },
  {
    "ParameterKey": "PrivateSubnet1CIDR",
    "ParameterValue": "11.200.13.128/26"
  },
  {
    "ParameterKey": "PrivateSubnet2CIDR",
    "ParameterValue": "11.200.13.192/26"
  },
  {
    "ParameterKey": "PublicLoadBalancerName",
    "ParameterValue": "blazorserverapp"
  },
  {
    "ParameterKey": "PrivateLoadBalancerName",
    "ParameterValue": "blazorserverapp-internal"
  },
  {
    "ParameterKey": "ECSClusterName",
    "ParameterValue": "blazorserverapp"
  }
]

```

Run the below command from the blazor application project root directory  

`aws cloudformation create-stack --stack-name blazorserverapp-networking-infra --capabilities=CAPABILITY_NAMED_IAM --template-body file://./buildScripts/ecs-infra.yaml --parameters file://./buildScripts/ecs-infra.json`  

The above command will validate and create the needful networking things in the aws. You can see the status of the command in the AWS CloudFormation console. The status will be "Create Completed". If there is any failures, Make sure your IAM user have necessary access to create these resources.

## [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#deploy-blazor-app-into-ecs)Deploy Blazor app into ECS

Save the below Cloudformation template as "ecs-service.yaml" inside the buildScripts directory  

```

AWSTemplateFormatVersion: 2010-09-09
Description: This stack will deploy the blazorserverapp on AWS Fargate,
  hosted in a private/public subnet, behind a private/public load balancer.

Parameters:
  ServiceName:
    Type: String
    Description: A name for the service
  ImageUrl:
    Type: String
    Description:
      The url of a docker image that contains the application process that
      will handle the traffic for this service
  ContainerPort:
    Type: Number
    Description: What port number the application inside the docker container is binding to
  DesiredCount:
    Type: Number
    Default: 1
    Description: How many copies of the service task to run
  ListenerRulePriority:
    Type: Number
    Default: 1
    Description: The priority of the listener rule defined in the load balancer
  LogGroupName:
    Type: String
    Description: Name of the log group where the logs from the service should be saved
  ASPNETCOREENV:
    Type: String
    Description: Value of the ASPNETCORE_ENVIRONMENT to be passed to the container
  HealthCheckURL:
    Type: String
    Description: Path of the health check address to be done by the load balancer

Resources:
  ECSTaskExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Effect: Allow
            Principal:
              Service: [ecs-tasks.amazonaws.com]
            Action: ["sts:AssumeRole"]
      Path: /
      RoleName: BlazorServerAppECSTaskExecRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

  ECSTaskALBPermissionPolicy:
    Properties:
      PolicyDocument:
        Statement:
          - Effect: Allow
            Action:
              - "elasticloadbalancing:DeregisterInstancesFromLoadBalancer"
              - "elasticloadbalancing:DeregisterTargets"
              - "elasticloadbalancing:Describe*"
              - "elasticloadbalancing:RegisterInstancesWithLoadBalancer"
              - "elasticloadbalancing:RegisterTargets"
            Resource:
              - !Join
                - ":"
                - - arn:aws:elasticloadbalancing
                  - !Ref "AWS::Region"
                  - !Ref "AWS::AccountId"
                  - !Sub "loadbalancer/app/blazorserverapp*"
      PolicyName: ECSTaskRole-ALB-PermissionPolicy
      Roles:
        - !Ref ECSTaskExecutionRole
    Type: AWS::IAM::Policy

  CloudWatchLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Ref "LogGroupName"
      RetentionInDays: 7
  # The task definition. This is a simple metadata description of what
  # container to run, and what resource requirements it has.
  TaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: !Ref "ServiceName"
      Cpu: 256
      Memory: 512
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      ExecutionRoleArn: !GetAtt ECSTaskExecutionRole.Arn
      ContainerDefinitions:
        - Name: !Ref "ServiceName"
          Cpu: 256
          Memory: 512
          Image: !Ref "ImageUrl"
          PortMappings:
            - ContainerPort: !Ref "ContainerPort"
          Environment:
            - Name: "ASPNETCORE_ENVIRONMENT"
              Value: !Ref ASPNETCOREENV
          LogConfiguration:
            LogDriver: awslogs
            Options:
              awslogs-group: !Ref "CloudWatchLogGroup"
              awslogs-region: !Ref AWS::Region
              awslogs-stream-prefix: !Ref "ASPNETCOREENV"

  # The service. The service is a resource which allows you to run multiple
  # copies of a type of task, and gather up their logs and metrics, as well
  # as monitor the number of running tasks and replace any that have crashed
  Service:
    Type: AWS::ECS::Service
    DependsOn: LoadBalancerRule
    Properties:
      ServiceName: !Ref "ServiceName"
      Cluster: !ImportValue ClusterName
      LaunchType: FARGATE
      DeploymentConfiguration:
        DeploymentCircuitBreaker:
          Enable: true
          Rollback: true
        MaximumPercent: 200
        MinimumHealthyPercent: 75
      DesiredCount: !Ref "DesiredCount"
      NetworkConfiguration:
        AwsvpcConfiguration:
          AssignPublicIp: ENABLED
          SecurityGroups:
            - !ImportValue FargateContainerSecurityGroup
          Subnets:
            - !ImportValue PublicSubnetOne
            - !ImportValue PublicSubnetTwo
      TaskDefinition: !Ref "TaskDefinition"
      LoadBalancers:
        - ContainerName: !Ref "ServiceName"
          ContainerPort: !Ref "ContainerPort"
          TargetGroupArn: !Ref "TargetGroup"

  # A target group. This is used for keeping track of all the tasks, and
  # what IP addresses / port numbers they have. You can query it yourself,
  # to use the addresses yourself, but most often this target group is just
  # connected to an application load balancer, or network load balancer, so
  # it can automatically distribute traffic across all the targets.
  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckIntervalSeconds: 6
      HealthCheckPath: !Ref "HealthCheckURL"
      HealthCheckProtocol: HTTP
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      TargetType: ip
      Name: !Ref "ServiceName"
      Port: !Ref "ContainerPort"
      Protocol: HTTP
      UnhealthyThresholdCount: 2
      VpcId: !ImportValue VPC

  # Create a rule on the load balancer for routing traffic to the target group
  LoadBalancerRule:
    Type: AWS::ElasticLoadBalancingV2::ListenerRule
    Properties:
      Actions:
        - TargetGroupArn: !Ref "TargetGroup"
          Type: "forward"
      Conditions:
        - Field: path-pattern
          PathPatternConfig:
            Values:
              - /*
      ListenerArn: !ImportValue PublicListener
      Priority: !Ref ListenerRulePriority

```

In the same way, add the below configuration template as "ecs-service.json" file inside the buildScripts directory.  

```

[
  {
    "ParameterKey": "ServiceName",
    "ParameterValue": "blazorserverapp"
  },
  {
    "ParameterKey": "ImageUrl",
    "ParameterValue": "{your-aws-account-id}.dkr.ecr.{your-default-region}.amazonaws.com/blazorserverapp:latest"
  },
  {
    "ParameterKey": "ContainerPort",
    "ParameterValue": "8000"
  },
  {
    "ParameterKey": "DesiredCount",
    "ParameterValue": "1"
  },
  {
    "ParameterKey": "ListenerRulePriority",
    "ParameterValue": "1"
  },
  {
    "ParameterKey": "LogGroupName",
    "ParameterValue": "blazorserverapp-service"
  },
  {
    "ParameterKey": "ASPNETCOREENV",
    "ParameterValue": "Development"
  },
  {
    "ParameterKey": "HealthCheckURL",
    "ParameterValue": "/"
  }
]

```

Run the below command from the blazor application project root directory. This will create ECS clusters, Service, task definitions and deploy the container image we pushed just before into the task running inside service.  

`aws cloudformation create-stack --stack-name blazorserverapp-service-infra --capabilities=CAPABILITY_NAMED_IAM --template-body file://./buildScripts/ecs-service.yaml --parameters file://./buildScripts/ecs-service.json`  

## [](https://dev.to/sprabha1990/creating-deploying-net7-blazorserver-app-in-aws-using-cf-templates-4h3g#test-the-application)Test the application.

It's time to test our application. To find the URL of our application, You need to go to AWS Cloudformation in the console. Search for "blazorserverapp-networking-infra" stack. You'll find the external Url once you go to the output tab of "blazorserverapp-networking-infra" stack. Your application should open up once you click that link.

[![CF Console](https://res.cloudinary.com/practicaldev/image/fetch/s--flTCZyXY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xphka2h0g1rflmazna9m.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--flTCZyXY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xphka2h0g1rflmazna9m.png)

[![Application](https://res.cloudinary.com/practicaldev/image/fetch/s--pUV5EPmQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cnn2ky5dwfk0sdm2isbc.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--pUV5EPmQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cnn2ky5dwfk0sdm2isbc.png)

That's it. We have successfully created and deployed a Blazor Server .NET7 app in the AWS. We can see how to set up CICD for our application in a different post.

Full source is available here  
[https://github.com/sprabha1990/BlazorServer.NET7](https://github.com/sprabha1990/BlazorServer.NET7)
