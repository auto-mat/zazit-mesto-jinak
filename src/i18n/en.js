// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  header: {
    siteTitle: 'Zazit mesto jinak'
  },
  locale: {
    en: 'English',
    cz: 'Czech',
  },
  gender: {
    male: 'Male',
    female: 'Female',
    other: 'Other',
    unknown: 'I prefer not to say',
  },
  menu: {
    myEventsHeader: 'My Events',
    guideLink: 'Guide',
    informationLink: 'Information',
    contentOnWebLink: 'Content on web',
    organizersLink: 'Organizers',
    programLink: 'Program',
    profileLink: 'Profile',
    forumLink: 'Forum',
    donateLink: 'Donate',
    logoutButton: 'Logout'
  },
  form: {
    labelFirstName: 'First name',
    labelLastName: 'Last name',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelPassword: 'Password',
    labelPasswordConfirmation: 'Password confirmation',
    labelGender: 'Gender',
    labelDate: 'Date',
    labelImage: 'Image',
    hintPassword: 'It must contain at least 6 characters and at least 1 letter',
    messageEmailInvalid: 'Please fill in a valid email',
    messageFieldRequired: '{fieldName} is required',
    messagePasswordStrong: 'Password must contain at least 6 characters and at least 1 letter',
    messagePasswordNotIdentical: 'Passwords don\'t match',
    messagePhoneInvalid: 'Please fill in a valid phone number',
    messageDateInvalid: 'Please fill in a valid date',
  },
  register: {
    personalDetails: {
      title: 'Personal details',
      newsTitle: 'What you want to be informed about by email',
      onlyOrganizerNews: 'I just want information for the organizers',
      allNews: 'I want all information from AutoMat',
      messageTermsRequired: 'Error',
      labelPrivacyConsent: 'I agree to the processing of personal data in accordance with the ',
      linkPrivacyConsent: 'Data Protection and Processing Policy',
      buttonSubmit: 'Continue',
      labelCodexTerms: 'I have read and agree to comply with the ',
      linkCodexTerms: 'Experience the City Differently Code of Ethics'
    },
    event: {
      title: 'About Event',
      choiceNew: 'I want create new event',
      choiceFromPast: 'I want restore event from the past',
      labelEventFromPast: 'Choose your event from the past',
      labelEventName: 'Event name',
      labelPickDate: 'Date of the event',
      mainDate: 'Main date ZMJ',
      otherDate: 'Other date',
    }
  },
  profile: {
    title: 'Profile',
    subtitle: 'Personal information',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    genderLabel: 'Gender',
    buttonEdit: 'Edit',
    buttonAskForChange: 'Ask for change',
    languagePrefer: 'Language preference',
    titleEditName: 'Edit name',
    titleEditEmail: 'Edit email',
    titleEditPhone: 'Edit phone',
    titleEditGender: 'Edit gender',
    buttonUpdate: 'Save changes',
    buttonCancel: 'Cancel',
    textEmailChange: 'Are you sure about changing email? Administrators will contact you soon.',
    buttonYes: 'Yes',
  },
  event: {
    titleStatus: 'Status of your event',
    titleWebContent: 'Content for website ZMJ',
    content: {
      labelImage: 'Image',
      sublabelImage: 'Main image on your event at website ZMJ',
      labelMainText: 'Main text',
      sublabelMainText: 'Description about event (program is below)',
      labelLinks: 'Links',
      labelProgram: 'Program',
      buttonEdit: 'Edit'
    },
    program: {
      labelTitle: 'Title',
      labelDescription: 'Description',
      labelTimeFrom: 'From',
      labelTimeTo: 'To',
      labelCategories: 'Categories'
    }
  }
}