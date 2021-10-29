const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.route('/').get(async (req, res) => {
  try {
    const data = await Project.findAll({
      include: [{ model: User, attributes: ['id', 'name'] }],
    });
    const projects = data.map((proj) => {
      return proj.get({ plain: true });
    });
    res.render('homepage', { projects, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(418).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const data = await Project.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name'] }],
    });
    const project = data.get({ plain: true });
    res.render('project', { project });
  } catch (err) {
    res.status(418).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(418).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const data = await User.findByPk(req.session.user_id, {
      include: [{ model: Project }],
      attributes: {
        exclude: ['password']
      }
    })
    const user = data.get({ plain: true});
    res.render('user', { user });
  } catch (err) {
    res.status(418).json(err);
  }
});

module.exports = router;
