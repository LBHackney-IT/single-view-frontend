export default (width?: number): string => {
  switch (width) {
    case 1:
      return "govuk-!-width-full";
    case 0.5:
      return "govuk-!-width-one-half";
    case 1 / 3:
      return "govuk-!-width-one-third";
    case 2 / 3:
      return "govuk-!-width-two-thirds";
    case 1 / 4:
      return "govuk-!-width-one-quarter";
    case 3 / 4:
      return "govuk-!-width-three-quarters";
    default:
      return "";
  }
};
