function ff() {
	let array = [{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644504506277898/captcha.png",
			value: "EJXLTU"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644504711790603/captcha-1.png",
			value: "ISUUZP"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644504946675773/captcha-2.png",
			value: "FZZASX"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644505173196901/captcha-3.png",
			value: "EFNPUB"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644505479356456/captcha-4.png",
			value: "TVUJOW"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644505659703336/captcha-5.png",
			value: "VUAJJP"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910644505865252874/captcha-6.png",
			value: "BCPEIU"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910646490576355378/captcha-7-1.png",
			value: "MJOPUC"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910646742360416326/captcha-9-1.png",
			value: "EDTTMS"
		},{
			link: "https://media.discordapp.net/attachments/876556639589765170/910646901311942686/captcha-10.png",
			value: "JOJSAO"
		}]

		let randomObject = array[Math.floor(Math.random() * array.length)]
	  return randomObject;
}
module.exports = ff;