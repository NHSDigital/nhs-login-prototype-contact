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


// Route the user to the correct data entry page depending on whether they select 'phone' or 'email'
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

router.post('/account/v9/more/more-add-3', function (req, res) {
  var patientEmail = req.session.data['patient-email']
  var patientMobile = req.session.data['patient-mobile']
  if (patientEmail == "" && patientMobile == ""){
    res.redirect('/account/v9/more/more-type')
  }
  else {
    res.redirect('/account/v9/index')
  }
})

router.post('/account/v9/more/more-type-', function (req, res) {
  var type = req.session.data['more-type']
  if (type == "address"){
    res.redirect('/account/v9/address/address-add')
  }
  else if (type == "phone"){
    res.redirect('/account/v9/phone/phone-add')
  }
  else if (type == "email"){
    res.redirect('/account/v9/email/email-add')
  }
  else {
  }
})

router.post('/account/v9/phone/patient-change-login-mobile', function (req, res) {
  var choice = req.session.data['patient-change-login-mobile']
  if (choice == "yes"){
    res.redirect('/account/v9/manage-login?patient-mobile=')
  }
  else if (choice == "no"){
    res.redirect('/account/v9/index?patient-mobile=')
  }
})

router.post('/account/v9/email/patient-change-login-email', function (req, res) {
  var choice = req.session.data['patient-change-login-email']
  if (choice == "yes"){
    res.redirect('/account/v9/manage-login?patient-email=')
  }
  else if (choice == "no"){
    res.redirect('/account/v9/index?patient-email=')
  }
})



// The patient is choosing whether their login email/phone should be added to their contact details or not (email-change-done.html and phone-change-done.html)
router.post('/account/*/login/email-add-to-contact', function (req, res) {
  var choice = req.session.data['email-add-to-contact']
  if (choice == "yes"){
    res.redirect('email-change-done-done')
  }
  else if (choice == "no"){
    res.redirect('../manage-login')
  }
})

router.post('/account/*/login/phone-add-to-contact', function (req, res) {
  var choice = req.session.data['phone-add-to-contact']
  if (choice == "yes"){
    res.redirect('phone-change-done-done')
  }
  else if (choice == "no"){
    res.redirect('../manage-login')
  }
})




// The patient is choosing whether they want to review their contact details or not (prompt-1.html)
router.post('/account/*/prompt-', function (req, res) {
  var choice = req.session.data['prompt-review']
  if (choice == "yes"){
    res.redirect('../index?patient-mobile-unverified=07788995544')
  }
  else if (choice == "no"){
    res.redirect('../app')
  }
})



// Prompt 2 - the patient is choosing whether to add their email or phone to their contact details, or enter one (prompt-2-email.html and prompt-2-phone.html)
router.post('/account/*/prompt-2-email-', function (req, res) {
  var choice = req.session.data['patient-email']
  if (choice == ""){
    res.redirect('prompt-2-phone?has-added-login-email=y')
  }
  else {
    res.redirect('prompt-2-phone?has-added-login-email=y')
  }
})

router.post('/account/*/prompt-2-phone-', function (req, res) {
  var choice = req.session.data['patient-mobile']
  if (choice == ""){
    res.redirect('prompt-2-complete?has-added-login-phone=y')
  }
  else {
    res.redirect('prompt-2-complete?has-added-login-phone=y')
  }
})



// The patient is choosing whether they want to add their new login email/phone to their contact details (phone-add-login.html and email-add-login.html)
router.post('/account/*/email/add-login-email', function (req, res) {
  var patientEmail = req.session.data['patient-email']
  if (patientEmail == ""){
    res.redirect('../email/email-add?has-added-login-email=y')
  }
  else {
    res.redirect('../email/email-add-done?has-added-login-email=y')
  }
})

router.post('/account/*/phone/add-login-mobile', function (req, res) {
  var patientMobile = req.session.data['patient-mobile']
  if (patientMobile == ""){
    res.redirect('../phone/phone-add?has-added-login-phone=y')
  }
  else {
    res.redirect('../phone/phone-add-done?has-added-login-phone=y')
  }
})



// Prompt 3 - the patient is telling use whether their contact details are correct or not (prompt-3-check.html)
router.post('/account/*/prompt-3-choice', function (req, res) {
  var patientEmail = req.session.data['prompt-3']
  if (patientEmail == "yes"){
    res.redirect('prompt-3-complete')
  }
  else {
    res.redirect('index')
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