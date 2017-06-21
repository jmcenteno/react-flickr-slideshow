class Utilities {

  paginateArray(arr, itemsPerPage = 10) {

    const paginatedArray = [];
    let page = [];

    arr.forEach((item, i) => {

      page.push(item);

      if ((i + 1) % itemsPerPage === 0 || (i + 1) >= arr.length) {
        paginatedArray.push(page);
        page = [];
      }

    });

    return paginatedArray;

  }

}

export default new Utilities();
