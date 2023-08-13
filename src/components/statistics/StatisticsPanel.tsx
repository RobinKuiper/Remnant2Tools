import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DataContext } from "../../context/DataContext";
import { calculatePercentage } from "../../helpers";
import { CATEGORIES } from "../../constants";
import { Link, Slice } from "gatsby";

const Container = styled.div`
  width: 400px;
  min-height: 600px;

  table {
    width: 100%;

    tbody {
      tr {
        td {
          text-align: right;
        }

        td.title {
          font-weight: 900;
          text-align: left;
        }
      }
    }

    tfoot {
      tr {
        td {
          border-top: 1px solid #fff;
          text-align: right;
          font-weight: 900;
        }

        td.title {
          text-align: left;
        }
      }
    }
  }
`;

const StatisticsPanel = () => {
  const { statistics } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ total: 0, unlocked: 0, percentage: 0 });

  useEffect(() => {
    if (statistics.overall) {
      setLoading(false);
      const { total, unlocked } = statistics.overall;
      const percentage = calculatePercentage(unlocked, total, 2);
      setTotals({ total, unlocked, percentage });
    }
  }, [statistics]);

  return (
    <Container className="panel">
      {!loading ? (
        <>
          <h3>Unlockable Statistics</h3>

          <table cellSpacing={0} cellPadding={10}>
            <tbody>
              {CATEGORIES.map(category => {
                if (category.onlyDB) {
                  return;
                }

                const { fragment, label } = category;
                const { unlocked, total } = statistics[fragment];
                const perc = calculatePercentage(unlocked, total, 2);

                return (
                  <tr key={fragment}>
                    <td className="title">
                      <Link to={`/tracker/${fragment}`} title={label}>
                        {label}
                      </Link>
                    </td>
                    <td>
                      {unlocked}/{total}
                    </td>
                    <td>{perc}%</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="title">Overall</td>
                <td>
                  {totals.unlocked}/{totals.total}
                </td>
                <td>{totals.percentage}%</td>
              </tr>
            </tfoot>
          </table>
        </>
      ) : (
        <Slice alias="Loader" color={"#fff"} />
      )}
    </Container>
  );
};

export default StatisticsPanel;
