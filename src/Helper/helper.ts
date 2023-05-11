export function equal(a: any, b: any) {
  // 对象比较
  for (const key in a) {
    if (Object.hasOwn(a, key)) {
      if (a[key] !== b[key]) return false;
    }
  }
  return true;
}

interface Filter {
  headerName: string;
  field: string;
  filterCallback?: (dataItem: any) => any;
}

/**
 * 将数据对象key值改为标题值，只过滤并返回需要的列
 */
export const filterGridData = (data: any[], filters: Filter[]) => {
  return data.map(item => {
    let newItem: any = {};
    for (const filter of filters) {
      if (filter.filterCallback) {
        newItem[filter.headerName] = filter.filterCallback(item);
      } else {
        newItem[filter.headerName] = item[filter.field];
      }
    }
    return newItem;
  });
};