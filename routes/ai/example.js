
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

app.post('/example', async (req, res, next) => {
	try {
		let { content } = req.body
  
		let prompt = "Can you exegete Matthew 5:16 for me? \n It tells us to live a life that is pleasing to God and one that puts Him first. It is telling us to make sure that people can see our good works and will be motivated to glorify God because of them.\n\nWhat is the oldest book in the Bible?\nThe oldest book in the Bible is believed to be the book of Job, which is estimated to have been written between the 15th and 10th centuries BC. Q?: what is the purpose of the book of job? A: The purpose of the book of Job is to explore the question of why a good God allows suffering in the world. It tells the story of Job, a righteous man who is tested by God when he is subjected to numerous misfortunes. Through Job’s struggles, the book presents a discussion about the nature of justice and the relationship between God and man. It also serves to remind us to remain faithful in the face of suffering and to trust in God’s perfect plan.\n\nWhat is the primary purpose of Paul's letter to the Ephesians?\nThe primary purpose of Paul's letter to the Ephesians is to remind them of the importance of living a life of faith and unity in Christ. He encourages them to live in love, forgiveness, and humility, and to put away all their worldly desires. He also emphasizes their unity in Christ, reminding them that they are all part of one body and should strive to treat one another with respect and kindness. Paul's letter to the Ephesians serves to remind us of the importance of living with faith and unity in Christ, and to strive to put away all that is not of Him.\n\nHow can I be saved according to the Bible? \n According to the Bible, the only way to be saved is through faith in Jesus Christ. The Bible teaches us that Jesus died on the cross for our sins, and that by accepting Him as our Savior and trusting in Him, we can be saved from our sins and receive eternal life. The Bible also teaches us that we must repent of our sins and turn away from them in order to receive God’s forgiveness and grace. By putting our faith in Jesus and following His teachings, we can be saved and receive the gift of eternal life. \n\nWhy was Jesus crucified? \n Jesus was crucified because it was God’s plan for Him to die for the sins of mankind. Jesus’ death on the cross was the ultimate sacrifice for our sins and was necessary for our salvation. Through His death, Jesus paid the price for our sins and opened the way for us to have a relationship with God. \n\nWhy did Jonah run away from God? \n Jonah ran away from God because he was afraid of the mission God had given him. God had commanded Jonah to go to Nineveh and preach against its wickedness, but Jonah was afraid of the people of Nineveh and did not want to go. He thought that if he ran away, God would not be able to find him. However, God still found him and Jonah eventually obeyed God’s command. Jonah ran away because he did not want God to save the people of Ninevah, he was afraid that if he went there the people would repent and God would save them. Jonah did not think they were worthy of being saved. \n\n"
		let inputRaw = `${content}` 
		prompt += inputRaw


	const gptResponse = await openai.complete({
		engine: 'davinci',
		prompt,
		maxTokens: 150,
		temperature: 0.2,
		topP: 1,
		frequencyPenalty: 1,
		presencePenalty: 0,
		n: 1,
		user: req.user._id,
		stream: false,
		stop: ["###", "<|endoftext|>", ],
	});

	let output = `${gptResponse.data.choices[0].text}`


	// If the output string ends with one or more hashtags, remove all of them
	if (output.endsWith('"')) {
		output = output.substring(0, output.length - 1)
	}

	// If the output string ends with one or more hashtags, remove all of them
	if (output.endsWith('"')) {
		output = output.substring(0, output.length - 1)
	}

	// remove a single new line at the end of output if there is one
	if (output.endsWith('\n')) {
		output = output.substring(0, output.length - 1)
	}

	req.locals.input = prompt
	req.locals.inputRaw = inputRaw
	req.locals.output = output

	next()

	} catch (err){
		console.log(err.response)
		console.log(err.data)
		console.log(err.message)
	}
	
  })

module.exports = app