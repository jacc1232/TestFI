using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Models;

namespace Test.Controllers
{

    public class TaskController : Controller
    {
        TaskListDataAccess objTask = new TaskListDataAccess();
        
        [HttpGet]
        [Route("api/Task/Index")]
        public IEnumerable<TblTaskList> GetAllTask()
        {
            return objTask.getAllTaskList();
        }
        [HttpPost]
        [Route("api/task/Create")]
        public int Create(TblTaskList task)
        {
            return objTask.AddTask(task);
        }

        [HttpGet]
        [Route("api/task/Details/{id}")]
        public TblTaskList Details(int id)
        {
            return objTask.GetTaskData(id);
        }

        [HttpPut]
        [Route("api/task/Edit")]
        public int Edit(TblTaskList task)
        {
            return objTask.UpdateTask(task);
        }

        [HttpDelete]
        [Route("api/task/Delete/{id}")]
        public int Delete(int id)
        {
            return objTask.DeleteTask(id);
        }
    }
}
