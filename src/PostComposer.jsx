import React, { useState } from 'react';
import './App.css';

function PostComposer() {
  // 1. State for selected platform (default: Twitter)
  const [platform, setPlatform] = useState("Twitter");

  // 2. State for post content (controlled component)
  const [post, setPost] = useState("");

  // 3. State for post publish status banner
  const [successMessage, setSuccessMessage] = useState("");

  // Determine character limit dynamically based on selected platform
  const limit = platform === "Twitter" ? 280 : 3000;

  // Validation logic
  const isExceeded = post.length > limit;
  const isEmpty = post.trim().length === 0;
  const isButtonDisabled = isEmpty || isExceeded;

  // Calculate usage percentage for progress bar
  const usagePercentage = Math.min((post.length / limit) * 100, 100);

  // Handle post submission
  const handlePost = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      setSuccessMessage(`✨ Post published successfully to ${platform}!`);
    }
  };

  // Handle platform dropdown change
  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
    setSuccessMessage("");
  };

  // Handle textarea text change
  const handlePostChange = (e) => {
    setPost(e.target.value);
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  // Clear text
  const handleClear = () => {
    setPost("");
    setSuccessMessage("");
  };

  return (
    <div className={`composer-card platform-${platform.toLowerCase()}`}>
      {/* Header with Title and Platform Badge */}
      <div className="card-header">
        <div className="title-wrapper">
          <h1 className="app-title">Post Composer</h1>
          <span className={`platform-badge ${platform.toLowerCase()}`}>
            {platform === "Twitter" ? "𝕏 Twitter" : "in LinkedIn"}
          </span>
        </div>
        <p className="app-subtitle">Compose, validate, and preview your posts before publishing.</p>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="success-banner">
          <span className="success-icon">✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handlePost}>
        {/* Platform Selection */}
        <div className="form-group">
          <label htmlFor="platform" className="form-label">
            Select Platform:
          </label>
          <div className="select-container">
            <select
              id="platform"
              value={platform}
              onChange={handlePlatformChange}
              className="select-dropdown"
            >
              <option value="Twitter">Twitter (280 characters limit)</option>
              <option value="LinkedIn">LinkedIn (3000 characters limit)</option>
            </select>
          </div>
        </div>

        {/* Textarea (Controlled Component) */}
        <div className="form-group">
          <label htmlFor="postContent" className="form-label">
            Write your post:
          </label>
          <div className="textarea-wrapper">
            <textarea
              id="postContent"
              value={post}
              onChange={handlePostChange}
              placeholder="Write your post here..."
              rows="6"
              className={`post-textarea ${isExceeded ? 'textarea-error' : ''}`}
            />
          </div>
        </div>

        {/* Progress Bar Visualizer */}
        <div className="progress-track">
          <div
            className={`progress-fill ${isExceeded ? 'progress-exceeded' : ''}`}
            style={{ width: `${usagePercentage}%` }}
          />
        </div>

        {/* Dynamic Character Count Row */}
        <div className="counter-row">
          <div className="counter-info">
            <span className={`char-count ${isExceeded ? 'count-red' : ''}`}>
              Characters: {post.length} / {limit}
            </span>
          </div>
          <span className={`char-remaining ${isExceeded ? 'remaining-negative' : ''}`}>
            {limit - post.length >= 0 
              ? `${limit - post.length} left` 
              : `${post.length - limit} over limit`}
          </span>
        </div>

        {/* Error Message when limit is exceeded */}
        {isExceeded && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>Your post exceeds the {limit} character limit for {platform}.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="button-wrapper">
          {post.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="post-button"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostComposer;
