const threshold = {
    "general": {
        "bps": 1,
        "pps": 100
    },
    "tcp": {
        "bps": 2
    },
    "udp": {
        "bps": 2
    }}

const c=    Object.assign(
        {}, 
        ...function _flatten(o, prefix='') { 
          return [].concat(...Object.keys(o)
            .map(k => {
              console.log(k);
              return typeof o[k] === 'object' ?
                 _flatten(o[k],k) : 
                ({[`${prefix}.${k}`]: o[k]})
          }  )
          );
        }(threshold)
      )
console.log(c);
const b = ['icmp', 'general', 'tcp', 'udp']