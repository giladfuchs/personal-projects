export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const flatNestedObj = (threshold:any) =>  Object.assign(
    {}, 
    ...function flatten(o:any, prefix:string='') :any { 
      return [].concat(...Object.keys(o)
        .map(k => {
          return typeof o[k] === 'object' ?
             flatten(o[k],k) : 
            ({[`${prefix}.${k}`]: o[k]})
      }  )
      );
    }(threshold)
  )



export const array_obj_to_obj = (itearble: any[], value: any): number => itearble.find((o:any) => o.id === value)

export const array_obj_to_index_obj = (itearble: any[], value: any): any => itearble.findIndex((o:any) => o.id === value)

export const filter_array_obj = (itearble: any[], value: any): any[] => itearble.filter((o:any) => o.id !== value)

