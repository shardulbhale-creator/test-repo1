import { useState, useMemo } from "react";

export default function FinanceLab({ onAwardXp, onSaveNote }) {
  // Financial Model Input Parameters
  const [baseRevenue, setBaseRevenue] = useState(500); // $500M
  const [growthRate, setGrowthRate] = useState(15); // 15% CAGR
  const [ebitdaMargin, setEbitdaMargin] = useState(25); // 25% margin
  const [taxRate, setTaxRate] = useState(21); // 21% US / Global Corporate Tax
  const [wacc, setWacc] = useState(9.5); // 9.5% Discount rate
  const [terminalGrowth, setTerminalGrowth] = useState(2.5); // 2.5% Long-term GDP
  const [netDebt, setNetDebt] = useState(80); // $80M net debt
  const [sharesOut, setSharesOut] = useState(50); // 50M shares
  const [marketPrice, setMarketPrice] = useState(45); // Current share price $45

  // Compute 5-Year Unlevered Free Cash Flow (FCFF) Forecast
  const dcfModel = useMemo(() => {
    const years = [1, 2, 3, 4, 5];
    let prevRev = baseRevenue;
    let sumPV = 0;

    const projections = years.map((yr) => {
      const rev = prevRev * (1 + growthRate / 100);
      prevRev = rev;
      const ebitda = rev * (ebitdaMargin / 100);
      const ebit = ebitda * 0.85; // Depreciation allowance
      const taxes = ebit * (taxRate / 100);
      const nopat = ebit - taxes;
      const capexAndNwc = rev * 0.05; // 5% reinvestment
      const fcff = nopat - capexAndNwc;

      const discountFactor = 1 / Math.pow(1 + wacc / 100, yr);
      const pv = fcff * discountFactor;
      sumPV += pv;

      return {
        year: `Year ${yr}`,
        revenue: Math.round(rev),
        ebitda: Math.round(ebitda),
        nopat: Math.round(nopat),
        fcff: Math.round(fcff),
        discountFactor: discountFactor.toFixed(3),
        pv: Math.round(pv),
      };
    });

    // Terminal Value Calculation (Gordon Growth Model)
    const terminalFcff = projections[4].fcff * (1 + terminalGrowth / 100);
    const terminalValue = terminalFcff / (wacc / 100 - terminalGrowth / 100);
    const terminalDiscountFactor = 1 / Math.pow(1 + wacc / 100, 5);
    const pvTerminalValue = terminalValue * terminalDiscountFactor;

    // Enterprise & Equity Value
    const enterpriseValue = sumPV + pvTerminalValue;
    const equityValue = enterpriseValue - netDebt;
    const fairSharePrice = equityValue / sharesOut;
    const upsideDownside = ((fairSharePrice - marketPrice) / marketPrice) * 100;

    let recommendation = "FAIR VALUE";
    let recClass = "hold";
    if (upsideDownside > 15) {
      recommendation = "STRONG BUY (UNDERVALUED)";
      recClass = "buy";
    } else if (upsideDownside < -15) {
      recommendation = "SELL (OVERVALUED)";
      recClass = "sell";
    }

    return {
      projections,
      sumPV: Math.round(sumPV),
      terminalValue: Math.round(terminalValue),
      pvTerminalValue: Math.round(pvTerminalValue),
      enterpriseValue: Math.round(enterpriseValue),
      equityValue: Math.round(equityValue),
      fairSharePrice: parseFloat(fairSharePrice.toFixed(2)),
      upsideDownside: parseFloat(upsideDownside.toFixed(1)),
      recommendation,
      recClass,
    };
  }, [baseRevenue, growthRate, ebitdaMargin, taxRate, wacc, terminalGrowth, netDebt, sharesOut, marketPrice]);

  return (
    <div className="lab-page-container">
      {/* HEADER BANNER */}
      <div className="lab-header-banner mba-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">📈</div>
          <div>
            <div className="lab-eyebrow">MBA & EXECUTIVE FINANCE SUITE</div>
            <h2>Discounted Cash Flow (DCF) & Enterprise Valuation Simulator</h2>
            <p>
              Stress-test financial projections, sensitivity matrices, and cost of capital (WACC) to derive intrinsic share price valuations and buy/sell executive recommendations.
            </p>
          </div>
        </div>

        <div className="lab-nav-pills">
          <span className="finance-status-pill">
            Live Valuation Engine · Gordon Growth Model
          </span>
        </div>
      </div>

      <div className="lab-workspace-grid">
        {/* LEFT COLUMN: FINANCIAL ASSUMPTION SLIDERS */}
        <aside className="lab-problem-column">
          <div className="lab-card">
            <div className="lab-card-title">
              <span>⚙️</span> Valuation Assumptions & Drivers
            </div>

            <div className="finance-slider-group">
              <div className="f-slider-label">
                <span>Base Revenue ($M):</span>
                <strong>${baseRevenue}M</strong>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={baseRevenue}
                onChange={(e) => setBaseRevenue(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="finance-slider-group">
              <div className="f-slider-label">
                <span>5-Yr Revenue CAGR (%):</span>
                <strong>{growthRate}%</strong>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="finance-slider-group">
              <div className="f-slider-label">
                <span>EBITDA Operating Margin:</span>
                <strong>{ebitdaMargin}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={ebitdaMargin}
                onChange={(e) => setEbitdaMargin(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="finance-slider-group">
              <div className="f-slider-label">
                <span>Discount Rate (WACC %):</span>
                <strong>{wacc}%</strong>
              </div>
              <input
                type="range"
                min="6.5"
                max="16.0"
                step="0.5"
                value={wacc}
                onChange={(e) => setWacc(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="finance-slider-group">
              <div className="f-slider-label">
                <span>Perpetual Terminal Growth (%):</span>
                <strong>{terminalGrowth}%</strong>
              </div>
              <input
                type="range"
                min="1.5"
                max="3.8"
                step="0.1"
                value={terminalGrowth}
                onChange={(e) => setTerminalGrowth(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="finance-inputs-row">
              <div className="f-mini-input">
                <label>Current Market Price ($):</label>
                <input
                  type="number"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(Number(e.target.value))}
                />
              </div>
              <div className="f-mini-input">
                <label>Shares Out (M):</label>
                <input
                  type="number"
                  value={sharesOut}
                  onChange={(e) => setSharesOut(Number(e.target.value))}
                />
              </div>
              <div className="f-mini-input">
                <label>Net Debt ($M):</label>
                <input
                  type="number"
                  value={netDebt}
                  onChange={(e) => setNetDebt(Number(e.target.value))}
                />
              </div>
              <div className="f-mini-input">
                <label>Tax Rate (%):</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: VALUATION SUMMARY & CASH FLOW TABLE */}
        <section className="lab-editor-column">
          {/* VALUATION SUMMARY BANNER */}
          <div className="valuation-summary-banner">
            <div className="summary-col">
              <span className="summary-label">INTRINSIC FAIR VALUE</span>
              <h2 className="summary-price">${dcfModel.fairSharePrice}</h2>
              <span className="summary-sub">Market Price: ${marketPrice}</span>
            </div>

            <div className="summary-col center">
              <span className="summary-label">VALUATION UPSIDE / DOWNSIDE</span>
              <div className={`upside-badge ${dcfModel.upsideDownside >= 0 ? "positive" : "negative"}`}>
                {dcfModel.upsideDownside >= 0 ? "+" : ""}{dcfModel.upsideDownside}%
              </div>
              <span className="summary-sub">Margin of Safety</span>
            </div>

            <div className="summary-col right">
              <span className="summary-label">EXECUTIVE RULING</span>
              <div className={`recommendation-tag ${dcfModel.recClass}`}>
                {dcfModel.recommendation}
              </div>
              <button
                type="button"
                className="save-memo-btn"
                onClick={() => {
                  if (onAwardXp) onAwardXp(80);
                  if (onSaveNote) {
                    onSaveNote(
                      `DCF Valuation Memo: Fair Value $${dcfModel.fairSharePrice}`,
                      `### 📈 DCF Corporate Valuation Memorandum\n\n- **Target Fair Share Price**: $${dcfModel.fairSharePrice} (vs Market Price: $${marketPrice})\n- **Implied Margin of Safety**: ${dcfModel.upsideDownside}%\n- **Investment Recommendation**: ${dcfModel.recommendation}\n\n#### 📊 Key Valuation Parameters\n- **Enterprise Value**: $${dcfModel.enterpriseValue}M\n- **Equity Value**: $${dcfModel.equityValue}M\n- **WACC Discount Rate**: ${wacc}%\n- **Terminal Perpetual Growth**: ${terminalGrowth}%\n- **EBITDA Margin**: ${ebitdaMargin}%\n- **5-Yr Revenue CAGR**: ${growthRate}%`,
                      "Business (MBA/BBA)"
                    );
                  }
                }}
              >
                💾 Save Valuation Memo
              </button>
            </div>
          </div>

          {/* 5-YEAR CASH FLOW FORECAST TABLE */}
          <div className="lab-card table-card">
            <div className="lab-card-title">
              <span>📊</span> 5-Year Free Cash Flow to Firm (FCFF) Forecast ($M)
            </div>

            <div className="table-responsive">
              <table className="dcf-table">
                <thead>
                  <tr>
                    <th>Metric ($M)</th>
                    {dcfModel.projections.map((p) => (
                      <th key={p.year}>{p.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Gross Revenue</strong></td>
                    {dcfModel.projections.map((p) => (
                      <td key={p.year}>${p.revenue}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Operating EBITDA ({ebitdaMargin}%)</td>
                    {dcfModel.projections.map((p) => (
                      <td key={p.year}>${p.ebitda}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Net Operating Profit (NOPAT)</td>
                    {dcfModel.projections.map((p) => (
                      <td key={p.year}>${p.nopat}</td>
                    ))}
                  </tr>
                  <tr className="highlight-row">
                    <td><strong>Unlevered Free Cash Flow (FCFF)</strong></td>
                    {dcfModel.projections.map((p) => (
                      <td key={p.year}><strong>${p.fcff}</strong></td>
                    ))}
                  </tr>
                  <tr>
                    <td>Discount Factor (WACC {wacc}%)</td>
                    {dcfModel.projections.map((p) => (
                      <td key={p.year}>{p.discountFactor}</td>
                    ))}
                  </tr>
                  <tr className="pv-row">
                    <td><strong>Present Value (PV)</strong></td>
                    {dcfModel.projections.map((p) => (
                      <td key={p.year} className="pv-cell"><strong>${p.pv}</strong></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ENTERPRISE BRIDGE ROW */}
            <div className="dcf-bridge-row">
              <div className="bridge-item">
                <span>Sum of 5-Yr PVs:</span>
                <strong>${dcfModel.sumPV}M</strong>
              </div>
              <div className="bridge-item">
                <span>PV of Terminal Value:</span>
                <strong>${dcfModel.pvTerminalValue}M</strong>
              </div>
              <div className="bridge-item">
                <span>Total Enterprise Value:</span>
                <strong>${dcfModel.enterpriseValue}M</strong>
              </div>
              <div className="bridge-item highlight">
                <span>Equity Value:</span>
                <strong>${dcfModel.equityValue}M</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
