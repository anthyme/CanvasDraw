using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Anthyme.CanvasDraw.Models;
using Anthyme.CanvasDraw.Models.Anthyme;

namespace Anthyme.CanvasDraw.Controllers
{ 
    public class HomeController : Controller
    {
        private CanvasDrawContext db = new CanvasDrawContext();

        public ViewResult Index()
        {
            return View(db.Draws.ToList());
        }

        public ViewResult Details(int id)
        {
            Draw draw = db.Draws.Find(id);
            return View(draw);
        }

        public ActionResult Create()
        {
            return View();
        } 

        [HttpPost]
        public ActionResult Create(Draw draw)
        {
            if (ModelState.IsValid)
            {
                db.Draws.Add(draw);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(draw);
        }
        
        public ActionResult Delete(int id)
        {
            Draw draw = db.Draws.Find(id);
            return View(draw);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            Draw draw = db.Draws.Find(id);
            db.Draws.Remove(draw);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}