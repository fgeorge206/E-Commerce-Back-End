const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product]
  }).then(catData=>{
    res.json(catData)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg:"oh no error!",
      err
    })
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where:{
      id: req.params.id
    },
    include: [Product]
  }) .then(data=>{
    res.json(data)
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(catData=>{
    res.status(201).json(catData)
  }).catch(err=>{
    res.status(500).json({
      msg:"oh no error!",
      err
    })
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id: req.params.id
    }
  }).then(catUpdate =>{
      res.json(catUpdate);
    }).catch(err=>{
      console.log(err);
      res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
       where:{
        id:req.params.id
       }
    }).then(catDelete=>{
        if(!catDelete){
            return res.status(404).json({msg:"no such record"})
        }
        res.json(catDelete)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"oh no errorz!",
            err
        })
    })
})

module.exports = router;
