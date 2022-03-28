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

    // for (let i = 0; i < item.tenures.length; i++) {
    //    itemAddress = item.tenures[0].assetFullAddress;
    // }
    //checks addresses in data
    if (item.tenures != undefined && item.tenures.length > 0) {
      itemAddress = item.tenures[0].assetFullAddress;
    } else {
      result.score = 0;
      result.data = item;
      results.push(result);
      continue;
    }

    if (address && itemAddress.indexOf(address) > -1) {
      result.score += 1;
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
