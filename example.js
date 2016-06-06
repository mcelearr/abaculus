var request = require('request');
var abaculus = require('abaculus');

// Calculate image bounds from center lng,lat coordinates and
// pixel dimensions of final image (will be multipled by scale).
var params = {
  zoom: 14,
  scale: 1, // 1=72dpi, 4=288dpi
  center: {
      x: 6.6566667,
      y: 53.216667,
      w: 1000,
      h: 1000
  },
  // format: {format}, // png
  // quality: {quality},
  getTile: function(z,x,y, callback){
    var url = 'http://tile.openstreetmap.org/'+z+'/'+x+'/'+y+'.png';

    request({
      method: 'GET',
      url: url,
      encoding: null
    }, function(err, response, body) {
      if (err) {
        return callback(err);
      }
      console.log('got url', url);
      callback(null, body, response.headers);
    });
  }
  // limit: {limit}
};

abaculus(params, function(err, image, headers){
  if (err) return err;

  require('fs').writeFile('image.png', image, function(err, res) {
    console.log(err ? err : 'success');
  });
});
