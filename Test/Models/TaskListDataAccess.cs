using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Test.Models
{
    public class TaskListDataAccess
    {
        TestContext db = new TestContext();
        public IEnumerable<TblTaskList> getAllTaskList()
        {
            try
            {
                return db.TblTaskLists.ToList();
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        //To Add new employee record     
        public int AddTask(TblTaskList task)
        {
            try
            {
                db.TblTaskLists.Add(task);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar employee    
        public int UpdateTask(TblTaskList task)
        {
            try
            {
                db.Entry(task).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular employee    
        public TblTaskList GetTaskData(int id)
        {
            try
            {
                TblTaskList employee = db.TblTaskLists.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular employee    
        public int DeleteTask(int id)
        {
            try
            {
                TblTaskList emp = db.TblTaskLists.Find(id);
                db.TblTaskLists.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
