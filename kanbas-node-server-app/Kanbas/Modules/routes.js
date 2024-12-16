import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    modulesDao.deleteModule(moduleId);
    res.sendStatus(204);
  });
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    modulesDao.updateModule(moduleId, moduleUpdates);
    res.sendStatus(204);
  });
  app.post("/api/modules/:moduleId", (req,res) => {
    const { moduleId } = req.params;
    const modulesName = req.body;
    modulesDao.createModule(moduleId, modulesName);
    res.sendStatus(204);
  });
}
