const router = require('express').Router();
const path = require('path');
const serviceRoutes = require('./solutions');
const teamRoutes = require('./teams');
const serviceCategoryRoutes = require('./serviceCategory');
const logoRoutes = require('./logo');
const authRoutes = require('./auth');
const partnerRoutes = require('./partner');
const contactRoutes = require('./contact')
const blogRoutes = require('./blog');

// api routes
router.use('/api/auth', authRoutes);
router.use('/api/service', serviceRoutes);
router.use('/api/srvcategory', serviceCategoryRoutes);
router.use('/api/team', teamRoutes);
router.use('/api/logo', logoRoutes);
router.use('/api/partner', partnerRoutes);
router.use('/api/contact', contactRoutes);
router.use('/api/blog', blogRoutes)

router.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;
