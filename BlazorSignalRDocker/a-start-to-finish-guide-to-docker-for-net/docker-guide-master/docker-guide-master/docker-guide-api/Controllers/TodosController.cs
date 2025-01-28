using System.Collections.Generic;
using docker_guide_api.Data;
using docker_guide_api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace docker_guide_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoContext _dbContext;

        public TodosController(TodoContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _dbContext.Todos.Remove(new Todo { Id = id });
            _dbContext.SaveChanges();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> Get() => _dbContext.Todos;

        [HttpPost]
        public Todo Post([FromBody]Todo todo)
        {
            _dbContext.Todos.Add(todo);
            _dbContext.SaveChanges();
            return todo;
        }
    }
}