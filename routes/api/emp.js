const express = require('express');
const router = express.Router();
const sqlSetter = require('../../utils/sqlSetter')
const controller = require('../../controllers/controller')
// const httpAuth = require('../utils/httpAuth')

router.get('/total', sqlSetter('getTotalEmpCount'), controller)
router.get('/total/left', sqlSetter('getTotalEmpLeftCount'), controller)
router.get('/count/dept', sqlSetter('getEmpCountByDept'), controller)
router.get('/count/title', sqlSetter('getEmpCountByTitle'), controller)
router.get('/dept/:dept/:page', sqlSetter('getEmpListByDept'), controller)
router.get('/title/:title/:page', sqlSetter('getEmpListByTitle'), controller)
router.get('/history/:emp_no', sqlSetter('getEmpHistoryByEmpNo'), controller)
router.get('/rank/salary/:emp_no/:dept_name/:title', sqlSetter('getEmpThreeRankingsBySalary'), controller)
router.get('/rank/period/:emp_no/:dept_name/:title', sqlSetter('getEmpThreeRankingsByPeriod'), controller)
router.get('/:name/:page', sqlSetter('getEmpListByName'), controller)

module.exports = router

// set @r=0;
// select * from(
// select @r:=@r+1 as ranking,ed.emp_no,ed.from_date 
//     from (select * 
//         from current_dept_emp 
//         where dept_no=(select dept_no from departments where dept_name='Research') 
//         and 
//         to_date='9999-01-01' 
//         order by from_date asc
//     ) ed 
// )T limit 5;

// set @r=0;
// select @r:=@r+1 as ranking,ed.emp_no,ed.from_date 
//     from (select * 
//         from current_dept_emp 
//         where dept_no=(select dept_no from departments where dept_name='Research') 
//         and 
//         to_date='9999-01-01' 
//         order by from_date asc
//     ) ed; 

//     set @r=0;
//     select ranking,emp_no,from_date  
//     from (
//         select @r:=@r+1 as ranking,ed.emp_no,ed.from_date 
//         from (select * from current_dept_emp 
//             where dept_no=(
//                 select dept_no 
//                 from departments 
//                 where dept_name='Research'
//                 ) 
//                 and to_date='9999-01-01'
//             order by from_date asc) ed 
//     ) T 
//     where T.emp_no=411217;

//     select * from employees where emp_no=(select emp_no from current_dept_emp order by from_date asc limit 1);

//     select * from employees where emp_no=(select emp_no from current_Dept_emp where dept_no='d008' order by from_date asc limit 1);

//     select * from employees where emp_no=(select emp_no from titles where title='Senior Staff' order by from_date asc limit 1);