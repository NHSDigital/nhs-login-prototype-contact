// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// Passing data example
router.get('/examples/passing-data', function (req, res) {
  res.render('examples/passing-data/index')
});

// Branching example
router.post('/examples/branching/answer', function (req, res) {
  let nhsNumber = req.body.nhsNumber;

  if (nhsNumber === 'Yes') {
    res.redirect('/examples/branching/answer-yes')
  } else {
    res.redirect('/examples/branching/answer-no')
  }
});

router.post('/account/v7/other/other-add-next', function (req, res) {

  var patientEmail = req.session.data['patient-email']
  var patientMobile = req.session.data['patient-mobile']

  if (patientEmail == "" && patientMobile == ""){
    res.redirect('/account/v7/other/other-type')
  }
  else {
    res.redirect('/account/v7/index')
  }

})


// Clear all session data
router.get('/clear', (req, res) => {
	req.session.data = {}
	res.redirect('/index')
})

module.exports = router;

// Change email routing
router.get('/account/v2', function (req, res) {
  res.render('account/v2/index')
});


// Dev Mode

function devModeRoute(req, res, next) {
  if (!req.session.data['devMode']) {
    console.log('no data found');
    var devMode = req.query.devMode;
    if (devMode === 'true') {
      console.log('devmode detected');
      req.session.data['devMode'] = 'true'
      console.log('local storage updated');
    } else {
      console.log('devmode not detected');
    }
  } else {
    console.log('data found and set to ' + req.session.data['devMode'])
  }
  next()
}

router.get("/*", devModeRoute);
router.get("/", devModeRoute);