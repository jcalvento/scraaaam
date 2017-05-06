const findRecord = (recordSchema) => (req, res, next, value) => {
  const modelName = recordSchema.modelName;
  recordSchema.findById(value)
    .then(recordInstance => {
      req[modelName.toLowerCase()] = recordInstance;
      next()
    })
    .catch(error => {
      res.status(404).send('Not found')
    })
};

const createRecordAssociatedWith = (recordTable, associationName) => (req, res, next) => {
  const newRecord = new recordTable(req.body);
  let association = req[associationName];
  newRecord[associationName] = association;

  newRecord.save()
    .then(savedRecord => {
      const manyRelation = `${recordTable.modelName.toLowerCase()}s`;
      association[manyRelation].push(savedRecord);

      association.save().catch(next);

      res.json(newRecord)
    })
    .catch(next)
};

export { findRecord, createRecordAssociatedWith }