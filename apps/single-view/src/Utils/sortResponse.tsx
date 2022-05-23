export const sortResponseByRelevance = (
  personData: any,
  address: string | null
) => {
  let results: any = [];
  let itemAddress;
  for (let index in personData) {
    let result = {
      score: 0,
      data: {},
    };
    let item = personData[index];

    if (item.knownAddresses.fullAddress) {
      for (let i = 0; i < item.knownAddresses.length; i++) {
        itemAddress = item.knownAddresses[i].fullAddress.toLowerCase();
        if (address && itemAddress.indexOf(address.toLowerCase()) > -1) {
          result.score += 1;
        }
      }
    }
    result.data = item;
    results.push(result);
  }
  results.sort((a: any, b: any) => {
    if (a.score < b.score) {
      return 1;
    }

    if (a.score > b.score) {
      return -1;
    }

    return 0;
  });

  return results.map((result: any) => result.data);
};
