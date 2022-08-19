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
        public ActionResult Create(TblTaskList task)
        {
            try
            {
                objTask.AddTask(task);
                return Ok("Se guardo la tarea correctamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }

        }

        [HttpPut]
        [Route("api/task/Edit")]
        public ActionResult Edit(TblTaskList task)
        {
            try
            {
                objTask.UpdateTask(task);
                return Ok("Se actualizó la tarea correctamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }

        [HttpDelete]
        [Route("api/task/Delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                objTask.DeleteTask(id);
                return Ok("Tarea Eliminada Correctamente.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.Message);
            }
        }
    }
}
