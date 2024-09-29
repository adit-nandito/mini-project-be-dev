WITH relation_counts AS (
        SELECT
          employee_id,
          relation_status AS status,
          COUNT(relation_status) AS count
        FROM employee_family
        GROUP BY employee_id, relation_status
      ),
      education_employee AS (
        SELECT DISTINCT ON (employee_id)
          employee_id,
          level,
          name,
          CASE
            WHEN level = 'Profesor' THEN '1'
            WHEN level = 'Doktor' THEN '2'
            WHEN level = 'Strata 2' THEN '3'
            WHEN level = 'Strata 1' THEN '4'
            WHEN level = 'Sma' THEN '5'
            WHEN level = 'Smp' THEN '6'
            WHEN level = 'Sd' THEN '7'
            ELSE '8'
          END AS level_priority
        FROM education
        GROUP BY employee_id, level, name
        ORDER BY employee_id, level_priority
      )

      SELECT
        e.id AS employee_id,
        e.nik,
        e.name,
        e.is_active,
        ep.gender,
        DATE_PART('year', AGE(ep.date_of_birth)) || ' Years Old' AS age,
        ee.name AS school_name,
        ee.level,
        COALESCE(STRING_AGG(rc.count || ' ' || rc.status, ' & '), '-') AS family_data
      FROM employee e
      JOIN employee_profiles ep ON ep.employee_id = e.id
      LEFT JOIN education_employee ee ON ee.employee_id = e.id
      LEFT JOIN relation_counts rc ON rc.employee_id = e.id
      GROUP BY e.id, ep.gender, ep.date_of_birth, ee.name, ee.level
      ORDER BY e.id