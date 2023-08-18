import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { calculatePercentage } from "../../helpers";
import { Link, graphql, useStaticQuery } from "gatsby";
import Loader from "../Loader";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";

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
  const { categories } = useStaticQuery(graphql`
    {
      categories: allCategory(filter: { settings: { showIn: { eq: "tracker" } } }) {
        nodes {
          settings {
            fragment
            label
          }
        }
      }
    }
  `);
  const { statistics } = useAppSelector((state: RootState) => state.data);
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
              {categories.nodes.map(category => {
                const { fragment, label } = category.settings;
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
        <Loader color={"#fff"} />
      )}
    </Container>
  );
};

export default StatisticsPanel;
