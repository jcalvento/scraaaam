const findRecord = (recordSchema) => (req, res, next, value) => {
  const modelName = recordSchema.modelName;
  recordSchema.findById(value)
    .then(recordInstance => {
      if (!recordInstance) {
        throw new Error(`${modelName} not found ${value}`)
      }
      req[modelName.toLowerCase()] = recordInstance;
      next()
    })
    .catch(next)
};

const createRecordAssociatedWith = (recordTable, associationName) => (req, res, next) => {
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
};

export { findRecord, createRecordAssociatedWith }