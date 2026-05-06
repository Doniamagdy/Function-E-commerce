import { useState, useMemo } from "react";

const allProducts = [
  { id: 1,  icon: "👟", name: "Air Max Sneaker",       sku: "SKU-001", category: "Footwear",    price: 129, stock: 84,  max: 120, status: "In Stock"    },
  { id: 2,  icon: "👕", name: "Premium Cotton Tee",    sku: "SKU-002", category: "Apparel",     price: 39,  stock: 12,  max: 100, status: "Low Stock"   },
  { id: 3,  icon: "🎒", name: "Travel Backpack",        sku: "SKU-003", category: "Bags",        price: 89,  stock: 0,   max: 50,  status: "Out of Stock" },
  { id: 4,  icon: "⌚", name: "Smart Watch Pro",        sku: "SKU-004", category: "Electronics", price: 299, stock: 31,  max: 60,  status: "In Stock"    },
  { id: 5,  icon: "🎧", name: "Wireless Headphones",   sku: "SKU-005", category: "Electronics", price: 199, stock: 7,   max: 80,  status: "Low Stock"   },
  { id: 6,  icon: "💻", name: '15" Laptop Bag',         sku: "SKU-006", category: "Bags",        price: 59,  stock: 45,  max: 70,  status: "In Stock"    },
  { id: 7,  icon: "🧢", name: "Classic Cap",            sku: "SKU-007", category: "Apparel",     price: 24,  stock: 0,   max: 90,  status: "Out of Stock" },
  { id: 8,  icon: "🕶️", name: "Retro Sunglasses",      sku: "SKU-008", category: "Accessories", price: 75,  stock: 52,  max: 80,  status: "In Stock"    },
  { id: 9,  icon: "👟", name: "Lightweight Runner",     sku: "SKU-009", category: "Footwear",    price: 99,  stock: 9,   max: 100, status: "Low Stock"   },
  { id: 10, icon: "🧣", name: "Wool Scarf Deluxe",     sku: "SKU-010", category: "Apparel",     price: 34,  stock: 67,  max: 100, status: "In Stock"    },
  { id: 11, icon: "📱", name: "Rugged Phone Case",     sku: "SKU-011", category: "Electronics", price: 19,  stock: 138, max: 200, status: "In Stock"    },
  { id: 12, icon: "🎽", name: "Gym Performance Tee",   sku: "SKU-012", category: "Apparel",     price: 44,  stock: 5,   max: 80,  status: "Low Stock"   },
  { id: 13, icon: "👜", name: "Leather Crossbody",     sku: "SKU-013", category: "Bags",        price: 149, stock: 18,  max: 40,  status: "In Stock"    },
  { id: 14, icon: "🧤", name: "Fleece Winter Gloves",  sku: "SKU-014", category: "Accessories", price: 29,  stock: 0,   max: 60,  status: "Out of Stock" },
  { id: 15, icon: "🩳", name: "Cargo Shorts",          sku: "SKU-015", category: "Apparel",     price: 49,  stock: 33,  max: 70,  status: "In Stock"    },
  { id: 16, icon: "🎿", name: "Ski Goggles Pro",       sku: "SKU-016", category: "Accessories", price: 119, stock: 6,   max: 40,  status: "Low Stock"   },
];

const PER_PAGE = 8;

const statusConfig = {
  "In Stock":    { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Low Stock":   { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"   },
  "Out of Stock":{ bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-400"     },
};

const metrics = [
  { label: "Total Products", value: "248",    delta: "+12 this month", up: true,  icon: "📦" },
  { label: "Inventory Value", value: "$84.2K", delta: "+5.3%",          up: true,  icon: "💰" },
  { label: "Out of Stock",    value: "14",     delta: "+3 from last week", up: false, icon: "⚠️" },
  { label: "Today's Sales",   value: "$3,190", delta: "+8.1%",          up: true,  icon: "📈" },
];

function StockBar({ stock, max }) {
  const pct = max > 0 ? Math.round((stock / max) * 100) : 0;
  const color = pct === 0 ? "bg-red-400" : pct < 20 ? "bg-amber-400" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-6 text-right">{stock}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

function SortIcon({ col, sortCol, sortAsc }) {
  if (sortCol !== col) return <span className="ml-1 text-gray-300">↕</span>;
  return <span className="ml-1 text-gray-700">{sortAsc ? "↑" : "↓"}</span>;
}

export default function ProductsTable() {
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all");
  const [sortCol, setSortCol]     = useState(null);
  const [sortAsc, setSortAsc]     = useState(true);
  const [page, setPage]           = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => {
    let data = allProducts.filter((p) => {
      const matchFilter = filter === "all" || p.status === filter;
      const q = search.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });

    if (sortCol !== null) {
      const keys = ["name", "category", "price", "stock"];
      data = [...data].sort((a, b) => {
        const av = a[keys[sortCol]], bv = b[keys[sortCol]];
        return sortAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
      });
    }
    return data;
  }, [search, filter, sortCol, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const slice      = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSort = (col) => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else { setSortCol(col); setSortAsc(true); }
  };

  const handleFilter = (val) => { setFilter(val); setPage(1); setMobileMenu(false); };
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  const filterLabels = [
    { val: "all",          label: "All" },
    { val: "In Stock",     label: "In Stock" },
    { val: "Low Stock",    label: "Low Stock" },
    { val: "Out of Stock", label: "Out of Stock" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sidebar — hidden on mobile */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 py-6 px-4 z-20">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">P</div>
          <span className="font-semibold text-sm text-gray-900">ProductsHQ</span>
        </div>
        <nav className="flex flex-col gap-1 text-sm">
          {[["📊","Dashboard"],["📦","Products"],["🛒","Orders"],["👥","Customers"],["📈","Analytics"],["⚙️","Settings"]].map(([icon, label]) => (
            <button key={label} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${label === "Products" ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}>
              <span className="text-base">{icon}</span>
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto px-2">
          <div className="flex items-center gap-2 py-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">AK</div>
            <div>
              <p className="text-xs font-medium text-gray-800">Ahmed K.</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-56">
        {/* Top nav mobile */}
        <header className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">P</div>
            <span className="font-semibold text-sm">ProductsHQ</span>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 rounded-lg hover:bg-gray-50">
            <span className="text-xl">{mobileMenu ? "✕" : "☰"}</span>
          </button>
        </header>

        {/* Mobile nav drawer */}
        {mobileMenu && (
          <div className="lg:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setMobileMenu(false)}>
            <div className="absolute top-0 left-0 h-full w-56 bg-white p-4 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">P</div>
                <span className="font-semibold text-sm">ProductsHQ</span>
              </div>
              <nav className="flex flex-col gap-1 text-sm">
                {[["📊","Dashboard"],["📦","Products"],["🛒","Orders"],["👥","Customers"],["📈","Analytics"],["⚙️","Settings"]].map(([icon, label]) => (
                  <button key={label} onClick={() => setMobileMenu(false)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left ${label === "Products" ? "bg-gray-900 text-white" : "text-gray-500"}`}>
                    <span>{icon}</span><span className="font-medium">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Products</h1>
              <p className="text-sm text-gray-400 mt-0.5">Manage your product inventory</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-none">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search products..."
                  className="w-full sm:w-52 pl-9 pr-3 h-9 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-0"
                />
              </div>
              <button className="h-9 px-4 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap">
                + Add product
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-gray-400 font-medium">{m.label}</p>
                  <span className="text-base">{m.icon}</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900 leading-none mb-1">{m.value}</p>
                <p className={`text-xs font-medium ${m.up ? "text-emerald-600" : "text-red-500"}`}>
                  {m.up ? "↑" : "↑"} {m.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {filterLabels.map(({ val, label }) => (
              <button
                key={val}
                onClick={() => handleFilter(val)}
                className={`px-3 h-8 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  filter === val
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 self-center whitespace-nowrap pr-1 hidden sm:block">
              {filtered.length} products
            </span>
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {[["Product", 0], ["Category", 1], ["Price", 2], ["Stock", 3], ["Status", null], ["Actions", null]].map(([label, col]) => (
                      <th
                        key={label}
                        onClick={col !== null ? () => handleSort(col) : undefined}
                        className={`px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide ${col !== null ? "cursor-pointer hover:text-gray-700 select-none" : ""}`}
                      >
                        {label}
                        {col !== null && <SortIcon col={col} sortCol={sortCol} sortAsc={sortAsc} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {slice.length === 0 ? (
                    <tr><td colSpan={6} className="py-12 text-center text-gray-400 text-sm">No products found</td></tr>
                  ) : slice.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0 border border-gray-100">
                            {p.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                            <p className="text-xs text-gray-400">{p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{p.category}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">${p.price}</td>
                      <td className="px-4 py-3 min-w-[120px]">
                        <StockBar stock={p.stock} max={p.max} />
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">Edit</button>
                          <button className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-md hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-400 transition-colors">Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                      n === safePage ? "bg-gray-900 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >{n}</button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >›</button>
              </div>
            </div>
          </div>

          {/* Cards — mobile */}
          <div className="md:hidden flex flex-col gap-3">
            {slice.length === 0 ? (
              <p className="text-center text-gray-400 py-12 text-sm">No products found</p>
            ) : slice.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">{p.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.sku} · {p.category}</p>
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">${p.price}</span>
                  <span className="text-xs text-gray-400">Stock: {p.stock}/{p.max}</span>
                </div>
                <StockBar stock={p.stock} max={p.max} />
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">Edit</button>
                  <button className="flex-1 py-1.5 text-xs font-medium border border-red-100 rounded-lg hover:bg-red-50 text-red-500">Delete</button>
                </div>
              </div>
            ))}

            {/* Mobile pagination */}
            <div className="flex items-center justify-between mt-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
                className="px-4 py-2 text-xs font-medium border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-30">
                ← Prev
              </button>
              <span className="text-xs text-gray-400">Page {safePage} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                className="px-4 py-2 text-xs font-medium border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-30">
                Next →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}