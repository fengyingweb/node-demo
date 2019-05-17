import 'reflect-metadata';
const config = require('./common/config.ts');
const {createConnection} = require('typeorm');
const User = require('./entity/User.ts');
const express = require('express');

const shell = require('shelljs');
// console.log(shell);
// console.log(express);
// console.log(config.get('database'));

//createConnection(config.get('database')).then(async connection => {
//  console.log(connection);
//  let user = new User();
//  user.userName = 'fengying';
//  user.password = '123456';
//  user.email = 'fengying_web@163.com';
//
//  let userRepository = connection.getRepository(User);
//
//  // 保存数据
//  await userRepository.save(user);
//
//  // 查找数据
//  let saveUser = await userRepository.find({id: 2});
//  console.log(saveUser);
//
//  // 修改数据
//  saveUser[0].userName = 'wulv';
//
//  await userRepository.save(saveUser[0]);
//
//  // let removeUser = await userRepository.find({id: 3});
//  // console.log(removeUser);
//  // await userRepository.remove(removeUser[0]);
//}).catch(error => {
//  console.log(error);
//})

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git');
	shell.exit(1);
}

shell.cd('src/entity');
shell.ls('*.ts').forEach((file)=> {
	console.log(file);
});
