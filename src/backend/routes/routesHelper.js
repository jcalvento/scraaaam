function findRecord(req, res, next, value, record) {
  const modelName = record.modelName;
  console.log(modelName);
  record.findById(value)
    .then(recordInstance => {
      if (!recordInstance) {
        throw new Error(`${modelName} not found ${value}`)
      }
      req[modelName.toLowerCase()] = recordInstance;
      console.log(recordInstance);
      next()
    })
    .catch(next)
}

function createRecordAssociatedWith(req, res, next, recordTable, associationName) {
  const newRecord = new recordTable(req.body);
  let association = req[associationName];
  newRecord[associationName] = association;

  newRecord.save()
    .then(savedRecord => {
      const manyRelation = `${recordTable.modelName.toLowerCase()}s`;
      association[manyRelation].push(savedRecord);

      association.save()
        .then(_ => res.json(savedRecord))
        .catch(next);

      res.json(newRecord)
    })
    .catch(next)
}

export { findRecord, createRecordAssociatedWith }