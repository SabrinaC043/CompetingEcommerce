const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err)
  }
}); // find a single tag by its `id`
// be sure to include its associated Product data


router.put('/', async (req, res) => {
  // create a new tag
  try {
    const ProductTag = await Tag.create(req.body);
    res.status(200).json(ProductTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!tagId[0]) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a tag's name by its `id` value

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagId) {
      res.status(404).json({ message: "No category found with this id." });
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
