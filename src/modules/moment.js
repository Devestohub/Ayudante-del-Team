// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/26/2021 18:44

const locale = require('./def_locale');

const moment = require('moment');
require('moment-duration-format');

moment.updateLocale('en', {
	durationLabelsStandard: {
		s: locale.__('time.second'),
		ss: locale.__('time.seconds'),
		m: locale.__('time.minute'),
		mm: locale.__('time.minutes'),
		h: locale.__('time.hour'),
		hh: locale.__('time.hours'),
		d: locale.__('time.day'),
		dd: locale.__('time.days'),
		w: locale.__('time.week'),
		ww: locale.__('time.weeks'),
		M: locale.__('time.month'),
		MM: locale.__('time.months'),
		y: locale.__('time.year'),
		yy: locale.__('time.years'),
	},
});

const duration = (time) =>
	moment
		.duration(time)
		.format(
			`y __, M __, w __, d __, h __, m __ [${locale.__('words.and')}] s __`
		);

module.exports = duration;
