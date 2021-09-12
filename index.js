#!/usr/bin/env node

const { program } = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");

const URL = "RiverTwilight/next-site-template",
	DOWNLOAD_PATH = "";

program.version("1.0.0");

program
	.command("init <name>")
	.description("init a project")
	.option("-t, --type,", "")
	.action((name, opts) => {
		console.log(name, opts);

		inquirer
			.prompt([
				{
					name: "description",
					message: "请输入项目描述",
				},
				// {
				// 	name: "author",
				// 	message: "请输入项目作者",
				// 	default: "robot",
				// },
				// {
				// 	name: "type",
				// 	type: "list",
				// 	message: "choose a type of project to init",
				// 	choices: ["react", "vue", "h5"],
				// 	default: "react",
				// },
			])
			.then((res) => {
				console.log(res);
				download(URL, "./template", { clone: true }, (error) => {
					if (!error) {
						const packagePath = path.join(
							DOWNLOAD_PATH,
							"package.json"
						);
						// 判断是否有package.json, 要把输入的数据回填到模板中
						if (fs.existsSync(packagePath)) {
							const content = fs
								.readFileSync(packagePath)
								.toString();
							// handlebars 模板处理引擎
							const template = handlebars.compile(content);
							const result = template(param);
							fs.writeFileSync(packagePath, result);
						} else {
							console.log("failed! no package.json");
						}
					}
				});
			});
	});

program.parse(process.argv);
