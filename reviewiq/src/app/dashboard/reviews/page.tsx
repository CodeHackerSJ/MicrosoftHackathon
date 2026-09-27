'use client';

import React, { useState } from 'react';
import { reviews, applications } from '@/data/mockData';
import Badge from '@/components/Badge';
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  Sparkles,
  Smartphone,
  Apple,
  MessageSquare,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutList,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function ReviewExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.themes.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRating = selectedRating === 'all' || r.rating === selectedRating;
    const matchesSentiment = selectedSentiment === 'all' || r.sentiment === selectedSentiment;
    const matchesRisk = selectedRisk === 'all' || r.churnRisk === selectedRisk;
    const matchesApp = selectedApp === 'all' || r.appId === selectedApp;

    return matchesSearch && matchesRating && matchesSentiment && matchesRisk && matchesApp;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRating('all');
    setSelectedSentiment('all');
    setSelectedRisk('all');
    setSelectedApp('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Review Explorer & Feedback Management
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--primary-50)] text-[var(--primary-600)] font-semibold border border-[var(--primary-100)]">
              {filteredReviews.length} Results
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Search, filter, and operationalize individual customer feedback across all store endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="inline-flex p-0.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)]">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[var(--primary-50)] text-[var(--primary-600)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Card View"
            >
              <LayoutList size={14} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[var(--primary-50)] text-[var(--primary-600)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Table View"
            >
              <TableIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="saas-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search by keywords (e.g., 'UPI crash', 'slow', 'biometric')..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs saas-input placeholder:text-[var(--text-tertiary)]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* App Filter */}
            <select
              value={selectedApp}
              onChange={(e) => {
                setSelectedApp(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs saas-input bg-[var(--bg-input)]"
            >
              <option value="all">All Connected Apps</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name} ({app.platform})
                </option>
              ))}
            </select>

            {/* Churn Risk Filter */}
            <select
              value={selectedRisk}
              onChange={(e) => {
                setSelectedRisk(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs saas-input bg-[var(--bg-input)]"
            >
              <option value="all">All Churn Risks</option>
              <option value="high">High Churn Risk</option>
              <option value="medium">Medium Churn Risk</option>
              <option value="low">Low Churn Risk</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg border border-[var(--border-app)] hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 shrink-0"
              title="Reset Filters"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-subtle)] text-xs">
          <span className="text-[11px] font-semibold text-[var(--text-muted)] mr-1 uppercase tracking-wider">
            Rating:
          </span>
          {['all', 5, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => {
                setSelectedRating(r as any);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedRating === r
                  ? 'bg-[var(--primary-600)] text-white font-semibold'
                  : 'bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
              }`}
            >
              {r === 'all' ? 'All Stars' : `${r} ★`}
            </button>
          ))}

          <div className="h-4 w-px bg-[var(--border-app)] mx-1 hidden sm:block" />

          <span className="text-[11px] font-semibold text-[var(--text-muted)] mr-1 uppercase tracking-wider hidden sm:inline">
            Sentiment:
          </span>
          {['all', 'positive', 'neutral', 'negative'].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedSentiment(s);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-colors ${
                selectedSentiment === s
                  ? 'bg-[var(--primary-600)] text-white font-semibold'
                  : 'bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Review List View */}
      {filteredReviews.length === 0 ? (
        <div className="saas-card p-12 text-center">
          <MessageSquare size={32} className="mx-auto text-[var(--text-muted)] mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-[var(--text-primary)]">No reviews match your filter criteria</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, rating stars, or churn risk filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-1.5 rounded-lg bg-[var(--primary-600)] text-white text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="space-y-3">
          {paginatedReviews.map((review) => {
            const app = applications.find((a) => a.id === review.appId);
            return (
              <div
                key={review.id}
                className="saas-card p-4 sm:p-5 hover:border-[var(--border-app)] transition-all"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={
                            i < review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-[var(--border-app)]'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {review.userName}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">•</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {review.date}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">•</span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {review.country}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant="secondary">
                      {app?.name} ({review.platform}) v{review.version}
                    </Badge>
                    <Badge
                      variant={
                        review.sentiment === 'positive'
                          ? 'positive'
                          : review.sentiment === 'negative'
                          ? 'negative'
                          : 'neutral'
                      }
                    >
                      {review.sentiment}
                    </Badge>
                    <Badge
                      variant={
                        review.churnRisk === 'high'
                          ? 'critical'
                          : review.churnRisk === 'medium'
                          ? 'medium'
                          : 'low'
                      }
                    >
                      {review.churnRisk} risk
                    </Badge>
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  "{review.text}"
                </p>

                {/* Footer Meta & Actions */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                      AI Themes:
                    </span>
                    {review.themes.length > 0 ? (
                      review.themes.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)] text-[10px] font-medium"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-[var(--text-muted)] italic">
                        None detected
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Action task created for review ${review.id}`)}
                      className="text-[11px] text-[var(--primary-600)] font-semibold hover:underline"
                    >
                      + Create Action Item
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-app)] bg-[var(--bg-card-subtle)] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Review Text</th>
                  <th className="py-3 px-4">App & Version</th>
                  <th className="py-3 px-4">Sentiment</th>
                  <th className="py-3 px-4">Churn Risk</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {paginatedReviews.map((review) => {
                  const app = applications.find((a) => a.id === review.appId);
                  return (
                    <tr
                      key={review.id}
                      className="hover:bg-[var(--bg-card-subtle)] transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-[var(--text-primary)] shrink-0">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          <span>{review.rating}.0</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <div className="font-semibold text-[var(--text-primary)] text-xs truncate">
                          {review.userName}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                          {review.text}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">
                        {app?.name} ({review.platform}) v{review.version}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            review.sentiment === 'positive'
                              ? 'positive'
                              : review.sentiment === 'negative'
                              ? 'negative'
                              : 'neutral'
                          }
                        >
                          {review.sentiment}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            review.churnRisk === 'high'
                              ? 'critical'
                              : review.churnRisk === 'medium'
                              ? 'medium'
                              : 'low'
                          }
                        >
                          {review.churnRisk}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-muted)] font-mono text-[11px]">
                        {review.date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      {filteredReviews.length > 0 && (
        <div className="saas-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[var(--text-muted)] text-[11px]">
            Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> -{' '}
            <strong>{Math.min(currentPage * itemsPerPage, filteredReviews.length)}</strong> of{' '}
            <strong>{filteredReviews.length}</strong> reviews
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="px-2 font-mono text-[11px] text-[var(--text-muted)]">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
