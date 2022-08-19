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
            return db.TblTaskLists.ToList();
        }
        //To Add new task record     
        public void AddTask(TblTaskList task)
        {
            db.TblTaskLists.Add(task);
            db.SaveChanges();
        }

        //To Update the records of a particluar task    
        public void UpdateTask(TblTaskList task)
        {
            db.Entry(task).State = EntityState.Modified;
            db.SaveChanges();
        }

        //To Delete the record of a particular task    
        public void DeleteTask(int id)
        {
            TblTaskList task = db.TblTaskLists.Find(id);
            db.TblTaskLists.Remove(task);
            db.SaveChanges();
        }
    }
}
