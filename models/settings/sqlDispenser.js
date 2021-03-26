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

let create_view_current_titles =
    `create table if not exists ${dbSetting.view_current_titles} as(
        with ct as (
            select t.*, row_number() over 
            (partition by t.emp_no order by t.to_date desc) as rn 
            from ${dbSetting.table_titles} t
        ) 
        select * from ct where rn=1
    );`

// these views are changed into tables in order to apply index!
let create_views =
    create_view_current_dept_manager +
    create_view_current_salaries +
    create_view_current_titles

let getTotalEmpCount =
    `select count(*) as count from ${dbSetting.table_current_dept_emp};`

let getTotalEmpLeftCount =
    `select count(*) as count from ${dbSetting.table_dept_emp} 
    where to_date<'9999-01-01';`

let getEmpCountByDept =
    `select d.dept_name,count(*) as count 
    from ${dbSetting.table_current_dept_emp} cde 
    left join ${dbSetting.table_departments} d 
    on cde.dept_no=d.dept_no 
    group by cde.dept_no;`

let getEmpCountByTitle =
    `select title, count(*) as count 
    from ${dbSetting.table_titles} 
    where to_date='9999-01-01' 
    group by title;`

let getEmpListByName =
    `select 
    T.emp_no, T.birth_date,T.first_name, T.last_name,T.gender,T.hire_date,
    d.dept_name,ct.title,
    case when year(c.to_date)<9998 then 1 else 0 end as 'left',
    case when s1.salary>s2.salary then 1 else 0 end as 'more' 
    from (
        select * from ${dbSetting.table_employees} where first_name like concat('%',?,'%') or 
        last_name like concat('%',?,'%')
    ) T 
    left join ${dbSetting.table_current_dept_emp} c on T.emp_no = c.emp_no  
    left join ${dbSetting.table_departments} d on c.dept_no=d.dept_no 
    left join ${dbSetting.view_current_dept_manager} m on c.dept_no = m.dept_no 
    left join ${dbSetting.view_current_titles} ct on ct.emp_no=T.emp_no 
    left join ${dbSetting.view_current_salaries} s1 on s1.emp_no = T.emp_no 
    left join ${dbSetting.view_current_salaries} s2 on m.emp_no=s2.emp_no 
    limit ?,${dbSetting.queryLimit};`

let getEmpListByDept =
    `select 
    T.emp_no, T.birth_date,T.first_name, T.last_name,T.gender,T.hire_date,
    d.dept_name,ct.title,
    case when year(T.to_date)<9998 then 1 else 0 end as 'left',
    case when s1.salary>s2.salary then 1 else 0 end as 'more' 
    from (select e.*,de.dept_no,de.to_date from ${dbSetting.table_current_dept_emp} de 
    left join ${dbSetting.table_employees} e on de.emp_no=e.emp_no 
    where de.dept_no=(
        select dept_no from ${dbSetting.table_departments} 
        where dept_name=?)
    ) T 
    left join ${dbSetting.table_departments} d on T.dept_no=d.dept_no 
    left join ${dbSetting.view_current_titles} ct on ct.emp_no=T.emp_no 
    left join ${dbSetting.view_current_dept_manager} m on T.dept_no = m.dept_no 
    left join ${dbSetting.view_current_salaries} s1 on s1.emp_no = T.emp_no 
    left join ${dbSetting.view_current_salaries} s2 on m.emp_no=s2.emp_no 
    limit ?,${dbSetting.queryLimit};`

let getEmpListByTitle =
    `select 
    T.emp_no, T.birth_date,T.first_name, T.last_name,T.gender,T.hire_date,
    d.dept_name,T.title,
    case when year(T.to_date)<9998 then 1 else 0 end as 'left',
    case when s1.salary>s2.salary then 1 else 0 end as 'more' 
    from (select e.*,ct.title,ct.to_date from ${dbSetting.view_current_titles} ct 
    left join ${dbSetting.table_employees} e on ct.emp_no=e.emp_no 
    where ct.title=?) T 
    left join ${dbSetting.table_current_dept_emp} de on de.emp_no=T.emp_no 
    left join ${dbSetting.table_departments} d on de.dept_no=d.dept_no 
    left join ${dbSetting.view_current_dept_manager} m on de.dept_no = m.dept_no 
    left join ${dbSetting.view_current_salaries} s1 on s1.emp_no = T.emp_no 
    left join ${dbSetting.view_current_salaries} s2 on m.emp_no=s2.emp_no 
    limit ?,${dbSetting.queryLimit};`

let getEmpHistoryByEmpNo =
    `select de.emp_no, d.dept_name,de.from_date,
    case when year(de.to_date)<9998 then de.to_date else 'present' end as 'to_date' 
    from (select * from ${dbSetting.table_dept_emp} where emp_no=?) de 
    left join ${dbSetting.table_departments} d on de.dept_no=d.dept_no;
    select emp_no,salary,from_date,
    case when year(to_date)<9998 then to_date else 'present' end as 'to_date' 
    from ${dbSetting.table_salaries} where emp_no=?;`

let getEmpThreeRankingsBySalary =
    `set @r=0;
    select T.ranking 
    from (
        select @r:=@r+1 as ranking, emp_no 
        from ${dbSetting.view_current_salaries} where to_date='9999-01-01' 
        order by salary desc) T 
    where T.emp_no=?;

    set @r=0;
    select ranking 
    from (
        select @r:=@r+1 as ranking, emp_no 
        from (
            select ed.emp_no,s.salary 
            from (
                select emp_no from ${dbSetting.table_current_dept_emp} 
                where dept_no=(
                    select dept_no from ${dbSetting.table_departments} 
                    where dept_name=?) 
                and to_date='9999-01-01'
            ) ed 
            left join ${dbSetting.view_current_salaries} s 
            on ed.emp_no=s.emp_no order by s.salary desc
        ) T
    ) T2 
    where emp_no=?;

    set @r=0;
    select ranking 
    from (
        select @r:=@r+1 as ranking, emp_no 
        from (
            select ct.emp_no,s.salary 
            from (
                select emp_no from ${dbSetting.view_current_titles} 
                where title=? and to_date='9999-01-01'
            ) ct 
            left join ${dbSetting.view_current_salaries} s 
            on ct.emp_no=s.emp_no order by s.salary desc
        ) T
    ) T2 
    where emp_no=?;`

let getEmpThreeRankingsByPeriod =
    `set @r=0;
    select T.ranking 
    from (
        select @r:=@r+1 as ranking, emp_no 
        from ${dbSetting.table_current_dept_emp} 
        where to_date='9999-01-01' 
        order by from_date asc
    ) T
    where T.emp_no=?;
    
    set @r=0;
    select ranking 
    from (
        select @r:=@r+1 as ranking, emp_no 
        from (
            select emp_no from ${dbSetting.table_current_dept_emp} 
            where dept_no=(
                select dept_no 
                from ${dbSetting.table_departments} 
                where dept_name=?
            ) 
            and to_date='9999-01-01' 
            order by from_date asc 
        ) T
    ) T2 
    where emp_no=?;

    set @r=0;
    select ranking 
    from (
        select @r:=@r+1 as ranking,emp_no from (
            select de.emp_no 
            from (
                select emp_no from ${dbSetting.view_current_titles} 
                where title=? and to_date='9999-01-01' 
            ) ct 
            left join ${dbSetting.table_current_dept_emp} de 
            on ct.emp_no=de.emp_no 
            order by de.from_date asc
        ) T2
    ) T 
    where emp_no=?;`

let getDistributionOverDeptWhenSalaryIsAndAbove =
    `select d.dept_name,count(*) as cnt 
    from ${dbSetting.view_current_salaries} cs 
    left join ${dbSetting.table_current_dept_emp} cde 
    on cs.emp_no=cde.emp_no 
    left join ${dbSetting.table_departments} d 
    on cde.dept_no=d.dept_no 
    where salary>=? group by dept_name;`

let getDistributionOverDeptWhenSalaryIsAndBelow =
    `select d.dept_name,count(*) as cnt 
    from ${dbSetting.view_current_salaries} cs 
    left join ${dbSetting.table_current_dept_emp} cde 
    on cs.emp_no=cde.emp_no 
    left join ${dbSetting.table_departments} d 
    on cde.dept_no=d.dept_no 
    where salary<=? group by dept_name;`

let getDistributionOverDeptOverSalaryRange =
    `select dept_name,sal, count(sal) as cnt from (
        select d.dept_name,case 
        when cs.salary<=40000 then 40000
        when cs.salary<=50000 then 50000
        when cs.salary<=60000 then 60000
        when cs.salary<=70000 then 70000
        when cs.salary<=80000 then 80000
        when cs.salary<=90000 then 90000
        when cs.salary<=100000 then 100000
        when cs.salary<=110000 then 110000
        when cs.salary<=120000 then 120000
        when cs.salary<=130000 then 130000
        when cs.salary<=140000 then 140000
        when cs.salary<=150000 then 150000
        when cs.salary<=160000 then 160000 else 170000 end as sal
        from ${dbSetting.table_current_dept_emp} cde 
        left join ${dbSetting.view_current_salaries} cs 
        on cde.emp_no=cs.emp_no
        left join ${dbSetting.table_departments} d 
        on cde.dept_no=d.dept_no
    ) T group by dept_name, sal order by dept_name, sal desc;`

let getDistributionOverEmpOverSalaryRange =
    `select sal, count(sal) as cnt from 
    (select case 
    when salary<=40000 then 40000
    when salary<=50000 then 50000
    when salary<=60000 then 60000
    when salary<=70000 then 70000
    when salary<=80000 then 80000
    when salary<=90000 then 90000
    when salary<=100000 then 100000
    when salary<=110000 then 110000
    when salary<=120000 then 120000
    when salary<=130000 then 130000
    when salary<=140000 then 140000
    when salary<=150000 then 150000
    when salary<=160000 then 160000 else 170000 end as sal
    from ${dbSetting.view_current_salaries}) T group by sal order by sal desc;`

let getDeptNames =
    `select dept_name from ${dbSetting.table_departments};`

let getTitleNames =
    `select distinct(title) from ${dbSetting.table_titles};`

let userFindById =
    `select * from ${dbSetting.table_user} where id=?;`

module.exports = {
    create_views,
    create_indexes,
    getTotalEmpCount,
    getTotalEmpLeftCount,
    getEmpCountByDept,
    getEmpCountByTitle,
    getEmpListByName,
    getEmpListByDept,
    getEmpListByTitle,
    getEmpHistoryByEmpNo,
    getEmpThreeRankingsBySalary,
    getEmpThreeRankingsByPeriod,
    getDistributionOverDeptWhenSalaryIsAndAbove,
    getDistributionOverDeptWhenSalaryIsAndBelow,
    getDistributionOverDeptOverSalaryRange,
    getDistributionOverEmpOverSalaryRange,
    getDeptNames,
    getTitleNames,
    userFindById,

}


// select de.emp_no, d.dept_name,de.from_date,
//     case when year(de.to_date)<9998 then de.to_date else 'present' end as 'to_date' 
//     from (select * from dept_emp where emp_no=10040) de 
//     left join departments d on de.dept_no=d.dept_no;
//     select emp_no,salary,from_date,
//     case when year(to_date)<9998 then to_date else 'present' end as 'to_date' 
//     from salaries where emp_no=10040;