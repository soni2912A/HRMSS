

import { useState, useEffect } from "react";
import { Trophy, Star, Loader2 } from "lucide-react";
import { awardAPI } from "../../../services/api";

const levelStyle = (type) => {
  switch ((type || "").toLowerCase()) {
    case "gold": return { bg: "from-amber-50 to-yellow-50 border-amber-200", badge: "bg-amber-100 text-amber-700", icon: "text-amber-500", trophy: "🥇" };
    case "silver": return { bg: "from-slate-50 to-gray-50 border-slate-200", badge: "bg-slate-100 text-slate-600", icon: "text-slate-500", trophy: "🥈" };
    case "bronze": return { bg: "from-orange-50 to-amber-50 border-orange-200", badge: "bg-orange-100 text-orange-700", icon: "text-orange-500", trophy: "🥉" };
    default: return { bg: "from-emerald-50 to-teal-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700", icon: "text-emerald-600", trophy: "🏆" };
  }
};

const UserAchievements = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
      
        const res = await awardAPI.getAll();
        setAwards(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  const totalCashPrize = awards.reduce((s, a) => s + (a.cashPrize || 0), 0);

  return (
    <div className="min-h-screen bg-[#f8fafa] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

    
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0f2e2e] flex items-center gap-2">
              <Trophy className="text-amber-500" /> My Achievements
            </h1>
            <p className="text-gray-400 text-sm mt-1">Awards and recognitions from admin</p>
          </div>
          {awards.length > 0 && (
            <div className="flex gap-3">
              <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 text-center">
                <span className="text-[10px] font-bold text-amber-500 block uppercase tracking-widest">Awards</span>
                <span className="text-lg font-bold text-amber-700">{awards.length}</span>
              </div>
              {totalCashPrize > 0 && (
                <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-center">
                  <span className="text-[10px] font-bold text-emerald-500 block uppercase tracking-widest">Total Prize</span>
                  <span className="text-lg font-bold text-emerald-700">₹{totalCashPrize.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-amber-500" size={36} />
          </div>
        ) : awards.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🏆</div>
            <p className="font-bold text-gray-500 text-lg">No achievements yet</p>
            <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
              Keep working hard! Your admin will recognize your efforts here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => {
              const style = levelStyle(award.awardType);
              return (
                <div key={award._id}
                  className={`rounded-2xl p-6 border-2 bg-gradient-to-br ${style.bg} flex flex-col hover:shadow-lg transition-all duration-200`}>

                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{style.trophy}</div>
                    {award.awardType && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${style.badge}`}>
                        {award.awardType}
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-[#0f2e2e] text-base mb-1">{award.awardName}</h3>
                  {award.description && (
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">{award.description}</p>
                  )}

                  <div className="mt-auto space-y-2">
                    {award.cashPrize > 0 && (
                      <div className="bg-white/70 rounded-xl px-3 py-2 text-center border border-white">
                        <span className="text-xs font-black text-emerald-700">
                          🎁 Cash Prize: ₹{award.cashPrize.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {award.giftItem && (
                      <div className="bg-white/70 rounded-xl px-3 py-2 text-center border border-white">
                        <span className="text-xs font-medium text-gray-600">🎀 Gift: {award.giftItem}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-white/60">
                      <span className="text-[10px] text-gray-400">
                        {new Date(award.date || award.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </span>
                      {award.awardBy && (
                        <span className="text-[10px] text-gray-400">by {award.awardBy}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAchievements;
