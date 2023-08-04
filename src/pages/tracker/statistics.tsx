import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import CategorySidebar from "../../components/layout/CategorySidebar";
import Layout from "../../components/layout/Layout";
import data from "../../data/data.json";
import { DataContext } from "../../context/DataContext";
import Redacted from "../../components/Redacted";
import { getAllLockedItems } from "../../dataHelpers";

const Page = styled.div`
  display: flex;
  flex-direction: row;

  .page-content {
    z-index: 10;
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    width: 90%;
    padding: 20px;

    position: relative;
    background: url("/images/bg2.webp");
    background-size: cover;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255, 255, 255, 1) 11%, rgba(231, 231, 231, 1) 23%, rgba(0, 0, 0, 0) 100%);
      z-index: -1;
    }

    .panels {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .panel {
        border: 1px solid #000;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.6);
        background: #292929;
        color: #fff;

        h3 {
          text-align: center;
          margin-bottom: 20px;
        }
      }

      .statistics {
        width: 400px;

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
      }

      .worlds {
        width: 200px;

        .values {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }
      }
    }

    .content-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin: 10px 0;
      padding: 0 10px;

      .right {
        font-size: 1.2em;
      }
    }
  }
`;

const calculatePercentage = (amount: number, total: number, decimals: number = 2) => {
  return +parseFloat(((amount / total) * 100) as string).toFixed(decimals);
};

const Statistics: React.FC = () => {
  const { statistics, unlocks } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ total: 0, unlocked: 0, percentage: 0 });
  const [worldsWithSecrets, setWorldsWithSecrets] = useState<string[]>([]);

  useEffect(() => {
    if (statistics.overall) {
      setLoading(false);
      const { total, unlocked } = statistics.overall;
      const percentage = calculatePercentage(unlocked, total, 2);
      setTotals({ total, unlocked, percentage });
    }
  }, [statistics]);

  useEffect(() => {
    const worldsWithLockedItems = getAllLockedItems(unlocks)
      .filter(item => item.world)
      .map(item => item.world)
      .filter((world, index, array) => array.indexOf(world) === index)
      .sort((a, b) => a.localeCompare(b));

    setWorldsWithSecrets(worldsWithLockedItems);
  }, []);

  return (
    <Layout>
      <Page>
        <CategorySidebar type="tracker" />

        <div className="page-content">
          <div className="background" />

          <div className="panels">
            <div className="panel statistics">
              <h3>Unlockable Statistics</h3>
              {!loading ? (
                <table cellSpacing={0} cellPadding={10}>
                  <tbody>
                    {Object.values(data).map(category => {
                      const { fragment, label } = category.settings;
                      const { unlocked, total } = statistics[fragment];
                      const perc = calculatePercentage(unlocked, total, 2);

                      return (
                        <tr key={fragment}>
                          <td className="title">{label}</td>
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
              ) : (
                <span>Loading...</span>
              )}
            </div>

            {worldsWithSecrets.length > 0 && (
              <div className="panel worlds">
                <h3>Worlds</h3>
                <p>Below are worlds where you still have secrets to unlock.</p>
                <div className="values">
                  {worldsWithSecrets.map(worldName => (
                    <Redacted key={worldName} value={worldName} bgColor="#5d5d5d" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Page>
    </Layout>
  );
};

export default Statistics;
