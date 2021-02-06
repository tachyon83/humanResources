const dbSetting = require('./dbConnectionSettings')

// '%' vs 'localhost'

let create_index_on_employees =
    `create index ${dbSetting.index_on_employees} 
    on ${dbSetting.table_employees} (emp_no);`

// let create_index_on_current_dept_emp =
//     `create index ${dbSetting.index_on_current_dept_emp} 
//     on ${dbSetting.table_current_dept_emp} (emp_no);`

let create_index_on_current_dept_manager =
    `create index ${dbSetting.index_on_current_dept_manager} 
    on ${dbSetting.view_current_dept_manager} (dept_no);`

let create_index_on_current_salaries =
    `create index ${dbSetting.index_on_current_salaries} 
    on ${dbSetting.view_current_salaries} (emp_no);`

// create_indexes is used only in dbSetup_local.js
let create_indexes =
    create_index_on_employees +
    create_index_on_current_dept_manager +
    create_index_on_current_salaries
// +create_index_on_current_dept_emp

let create_view_current_salaries =
    `create table if not exists ${dbSetting.view_current_salaries} as ( 
        with cs as (
            select s.*, row_number() over 
            (partition by s.emp_no order by s.to_date desc) as rn 
            from ${dbSetting.table_salaries} s
        )
        select * from cs where rn=1
    );`

let create_view_current_dept_manager =
    `create table if not exists ${dbSetting.view_current_dept_manager} as (
        with cdm as (
            select dm.*, row_number() over 
            (partition by dm.dept_no order by dm.to_date desc) as rn 
            from ${dbSetting.table_dept_manager} dm
        )
        select * from cdm where rn=1
    );`

// these views are changed into tables in order to apply index!
let create_views =
    create_view_current_dept_manager +
    create_view_current_salaries

let getEmpListByName =
    `select T.emp_no, T.first_name, T.last_name,
    case when year(c.to_date)<9999 then 1 else 0 end as 'left',
    case when s1.salary>s2.salary then 1 else 0 end as 'more' 
    from (
        select * from ${dbSetting.table_employees} where first_name like concat('%',?,'%') or 
        last_name like concat('%',?,'%')
    ) T 
    left join ${dbSetting.table_current_dept_emp} c on T.emp_no = c.emp_no  
    left join ${dbSetting.view_current_dept_manager} m on c.dept_no = m.dept_no 
    left join ${dbSetting.view_current_salaries} s1 on s1.emp_no = T.emp_no 
    left join ${dbSetting.view_current_salaries} s2 on m.emp_no=s2.emp_no 
    limit ?,${dbSetting.queryLimit};`

module.exports = {
    // create_view_current_salaries,
    // create_view_current_dept_manager,
    create_views,
    create_indexes,
    getEmpListByName,
}