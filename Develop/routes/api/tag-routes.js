const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [Product]
  }).then((tagData)=>{
    res.json(tagData);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({
      msg:"oh no error!",
      err: err,
    })
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {id: req.params.id},
    include: [Product]
  }).then((tagData)=>{
    res.json(tagData);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({
      msg:"oh no error!",
      err: err,
    })
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tagData)=>{
    res.status(201).json(tagData);
  }).catch((err)=>{
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id: req.params.id
    }
  }).then ((tagData)=>{
    res.status(201).json(tagData);
  }).catch((err)=>{
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
    }).then ((tagData)=>{
      if (tagData){
        return res.json(tagData);
      }else{
        return res.status(404).json({msg:"This doesn't exist."})
      }
      }).catch((err)=>{
        console.log(err);
        res.status(500).json({
          msg: "oh no error!",
          err: err,
    })
  })
});

module.exports = router;
