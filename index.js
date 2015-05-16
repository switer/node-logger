'use strict';

var fmt = require('util').format
var fs = require('fs')
var path = require('path')
var _settings = {
	dir: './'
}

function getTimes(tpl) {
	var dat = new Date
	var y = dat.getFullYear()
	var m = dat.getMonth() + 1
	var d = dat.getDate()

	var H = dat.getHours()
	var M = dat.getMinutes()
	var S = dat.getSeconds()
	var MM = dat.getMilliseconds()

	if (m <= 9) m = '0' + m
	if (d <= 9) d = '0' + d
	if (H <= 9) H = '0' + H
	if (M <= 9) M = '0' + M
	if (S <= 9) S = '0' + S

	return [y,m,d,H,M,S,MM]
}
/**
 * Constructor Function
 * @param {Object}
 */
function Logger(opt) {
	opt = opt || {}
	this._dir = opt.dir || _settings.dir

	this._pattern = opt.pattern ? opt.pattern + '_' : ''
	this._output = opt.output == false ? false:true

	this._filename
	this._stream
}
Logger.setting = function (key, v) {
	_settings[key] = v || './'
}
var proto = Logger.prototype

proto.getStream = function () {
	var times = getTimes()
	// {$pattern}_{$yyyy}-{$mm}-{$dd}-{$HH}   
	var filename = this._pattern + times[0] + times[1] + times[2] + times[3] + '.log'

	if (!this._stream || !this._filename || this._filename != filename) {
		if (this._stream) this._stream.end()
		this._filename = filename
		this._stream = fs.createWriteStream(path.join(this._dir, filename), 
			{
				flags: 'a', 
				encoding: 'utf-8'
			}
		)
		return this._stream
	} else {
		return this._stream
	}
}
/**
 * Log output message.
 *
 * @param  {String} levelStr
 * @param  {Array} args
 * @api private
 */
proto._log = function(levelStr, args) {
    var msg = fmt.apply(null, args);
    var times = getTimes()
    var stream = this.getStream()

    var str = '[' + times[0] + '-' + times[1] + '-' + times[2] + ' ' + times[3] + ':' + times[4] + ':' + times[5] + '.' + times[6] + ']'
        + ' [' + levelStr + '] '
        + msg

    if (this._output) console.log(str)

    stream.write(
        str + '\n'
    );
}
proto.log = function(msg) {
    this._log('LOG', arguments)
}
/**
 * Log emergency `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.emergency = function(msg) {
    this._log('EMERGENCY', arguments)
}

/**
 * Log alert `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.alert = function(msg) {
    this._log('ALERT', arguments)
}

/**
 * Log critical `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.critical = function(msg) {
    this._log('CRITICAL', arguments)
}

/**
 * Log error `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.error = function(msg) {
    this._log('ERROR', arguments)
}

/**
 * Log warning `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.warning = proto.warn = function(msg) {
    this._log('WARNING', arguments)
}

/**
 * Log notice `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.notice = function(msg) {
    this._log('NOTICE', arguments)
}

/**
 * Log info `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.info = function(msg) {
    this._log('INFO', arguments)
}

/**
 * Log debug `msg`.
 *
 * @param  {String} msg
 * @api public
 */

proto.debug = function(msg) {
    this._log('DEBUG', arguments)
}
module.exports = Logger
