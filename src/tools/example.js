import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Flame of the West",
	desc: "Study Scripture like never before",
	category: "Study",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "blue-400",
	toColor: "red-500",

	to: "/ai/example",
	api: "/ai/example",

	output: {
		title: "Answer",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		prompts: [{ 
				title: "Content", 
				attr: "content",  
				value: "", 
				placeholder: "What does Hebrews 11:1 mean?", 
				label: "",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Hello World ",
			},
		],
		example: {
			output: "Hello World Hello World Hello World Hello World Hello World Hello World Hello World ",
			// outputs: [
			// 	"The sun is very old, over 4.5 billion years",
			// 	"At 10,000 degrees, sun is also very hot",
			// 	"Gasses called coronal mass ejections erupt from the sun",
			// ],
			// Icon: RefreshIcon,
			color: "orange",
		}
	}]
		
}

export default obj

