const locale = {
  components: {
    conflictErrorSummary: {
      changesNotSaved: "Changes not saved",
      anotherUserMadeEdit: "Another user has edited this page since you opened it.",
      youEntered: "You entered:",
      toSaveMakeEdit: "To save your changes you must make your edits again.",
    },
    formErrorSummary: {
      error: "Error",
    },
    commentList: {
      errors: {
        unableToFetchReferenceData: "There was a problem retrieving the reference data",
        unableToFetchReferenceDataDescription:
          "Please try again. If the issue persists, please contact support.",
      },
    },
    workOrderList: {
      raisedAt: "Raised at",
      priority: "Priority",
      errors: {
        unableToFetchWorkOrder: "There was a problem retrieving repairs",
        unableToFetchWorkOrderDescription:
          "Please try again. If the issue persists, please contact support.",
      },
      noRepairs: "No repairs",
      seeAllWorkOrders: "See all repairs in Repairs Hub >",
      selectLabel: "Show",
      selectOptionLabel: "repairs",
    },
    stepper: {
      step: "Step",
    },
    statusErrorSummary: {
      statusTitle: (code: number): string => {
        switch (code) {
          case 403:
            return "You don't have the required persmissions to access this resource.";
          case 409:
            return locale.components.conflictErrorSummary.changesNotSaved;
          default:
            return "There was a problem with completing the action";
        }
      },
      statusDescription: (code: number): string => {
        switch (code) {
          case 409:
            return locale.components.conflictErrorSummary.anotherUserMadeEdit;
          default:
            return "Please try again. If the issue persists, please contact support.";
        }
      },
    },
  },
  hooks: {
    defaultErrorMessages: {
      W1: "You must correct the indicated errors",
      W2: "You must enter a description for this comment",
      W3: "You have 500 characters remaining",
      W4: "You must select an option to proceed",
      W5: "You must select a title to proceed",
      W6: "You must enter this information to proceeed",
      W7: "Date of birth must be in numerical format",
      W8: "You must remove special characters to proceed e.g. #@%$",
      W9: "You must enter a valid date to proceed",
      W10: "This date cannot be in the future",
      W11: "You must enter a valid month to proceed e.g. 01-12",
      W12: "You must enter a valid day to proceed e.g. 01-31",
      W13: "You must enter a valid year to proceed e.g. 1980",
      W14: "You must select a person type to proceed",
      W15: "You must enter a first name for this person",
      W16: "You must enter a last name for this person",
      W17: "You must enter a reason for creating this person",
      W18: "You must select a language or remove the language spoken",
      W19: "You must enter the ID number or remove the ID document",
      W20: "You must indicate if you have seen the ID document",
      W21: "You must select a gender",
      W22: "You must select a nationality",
      W23: "You must enter a valid National Insurance number",
      W24: "You must indicate one language as primary",
      W25: "You cannot enter more than 10 languages",
      W26: "You cannot enter more than 5 IDs",
      W27: "You must enter at least 2 characters.",
      W29: "End date must occur after start date",
      W30: "Start date must occur after the end date of the previous tenure",
      W31: "You must provide a title for this comment",
      W32: "You must select a category for this comment",
      W33: "You must select a valid type to proceed",
      W35: "You must enter a phone number to proceed",
      W36: "You must select a valid type to proceed",
      W38: "You must enter an email address to proceed",
      W40: "You must enter a valid email number to proceed",
      W41: "You must enter a valid phone number to proceed",
      W43: "You cannot add more than xx contact details",
      W44: "We encountered an error. Try again.",
      W45: "You cannot add more than 4 tenure holders",
      W46: "Person could not be created",
      W47: "Person created but could not be added to tenure",
      W48: "Person created but could not be added to tenure",
      W49: "You must enter details when Other is selected",
    },
  },
};

export default locale;
