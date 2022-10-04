const router = require('express').Router();
const { Category, Product } = require('../../models');
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err)
  }
});
// find one category by its `id` value
// be sure to include its associated Products



router.put('/', async (req, res) => {
  try {// create a new category
    const categoryNew = await Category.create(req.body);
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryId[0]) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryId) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
