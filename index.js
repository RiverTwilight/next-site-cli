#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const {
	existsSync,
	mkdirSync,
	readdirSync,
	lstatSync,
	copyFileSync,
	symlinkSync,
	readlinkSync,
  } = require("fs");
const inquirer = require("inquirer");
const handlebars = require("handlebars");

const URL = "direct:https://github.com/RiverTwilight/next-site-template.git",
	DOWNLOAD_PATH = "./template";

function copyFolderSync(src, dest) {
	if (!existsSync(dest)) {
		mkdirSync(dest);
	}

	readdirSync(src).forEach((entry) => {
		const srcPath = path.join(src, entry);
		const destPath = path.join(dest, entry);
		const stat = lstatSync(srcPath);

		if (stat.isFile()) {
			copyFileSync(srcPath, destPath);
		} else if (stat.isDirectory()) {
			copyFolderSync(srcPath, destPath);
		} else if (stat.isSymbolicLink()) {
			symlinkSync(readlinkSync(srcPath), destPath);
		}
	});
}

program.version("1.0.0");

// current path

program
	.command("init <name>")
	.description("init a project")
	.option("-t, --type,", "")
	.action((name, opts) => {
		//fs copy file

		const source = path.join(__dirname, "template");
		const target = path.join(process.cwd(), "/");

		copyFolderSync(source, target);

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
				{
					name: "theme",
					type: "list",
					message: "choose a type of project to init",
					choices: ["nav-side", "nav", "empty"],
					default: "nav-side",
				},
			])
			.then((param) => {
				// 判断是否有package.json, 要把输入的数据回填到模板中
				const packagePath = path.join("./", "package.json");
				if (fs.existsSync(packagePath)) {
					const content = fs.readFileSync(packagePath).toString();
					// handlebars 模板处理引擎
					const template = handlebars.compile(content);
					const result = template(param);
					fs.writeFileSync(packagePath, result);
				}

				// console.log({ name, ...param });
				// const spinner = ora("正在下载模板, 请稍后...");
				// spinner.start();
				// download(URL, DOWNLOAD_PATH, { clone: false }, (error) => {
				// 	if (!error) {
				// 		spinner.succeed();
				// 		const packagePath = path.join(
				// 			DOWNLOAD_PATH,
				// 			"package.json"
				// 		);
				// 		// 判断是否有package.json, 要把输入的数据回填到模板中
				// 		if (fs.existsSync(packagePath)) {
				// 			const content = fs
				// 				.readFileSync(packagePath)
				// 				.toString();
				// 			// handlebars 模板处理引擎
				// 			const template = handlebars.compile(content);
				// 			const result = template(param);
				// 			fs.writeFileSync(packagePath, result);
				// 		} else {
				// 			console.log("failed! no package.json");
				// 		}
				// 	} else {
				// 		spinner.fail();
				// 		console.log(chalk.red("failed! 拉取模板失败", error));
				// 		return;
				// 	}
				// });
			});
	});

program.parse(process.argv);
