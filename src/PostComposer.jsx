import React, { useState } from 'react';
import './App.css';

function PostComposer() {
  // 1. State for selected platform (default: Twitter)
  const [platform, setPlatform] = useState("Twitter");

  // 2. State for post content (controlled textarea)
  const [post, setPost] = useState("");

  // 3. State for submission feedback message
  const [successMessage, setSuccessMessage] = useState("");

  // Determine character limit dynamically based on selected platform
  const limit = platform === "Twitter" ? 280 : 3000;

  // Validation checks
  const isExceeded = post.length > limit;
  const isEmpty = post.trim().length === 0;
  const isButtonDisabled = isEmpty || isExceeded;

  // Handle post submission
  const handlePost = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      setSuccessMessage(`Your post has been successfully created for ${platform}!`);
    }
  };

  // Handle platform change
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

  return (
    <div className="composer-card">
      <h1 className="app-title">Post Composer</h1>
      
      {successMessage && (
        <div className="success-banner">
          <span>✓</span> {successMessage}
        </div>
      )}

      <form onSubmit={handlePost}>
        {/* Platform Selection Dropdown */}
        <div className="form-group">
          <label htmlFor="platform" className="form-label">
            Select Platform:
          </label>
          <select
            id="platform"
            value={platform}
            onChange={handlePlatformChange}
            className="select-dropdown"
          >
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>

        {/* Textarea (Controlled Component) */}
        <div className="form-group">
          <label htmlFor="postContent" className="form-label">
            Write your post:
          </label>
          <textarea
            id="postContent"
            value={post}
            onChange={handlePostChange}
            placeholder="Write your post here..."
            rows="6"
            className={`post-textarea ${isExceeded ? 'textarea-error' : ''}`}
          />
        </div>

        {/* Character Count Display */}
        <div className="counter-row">
          <span className={`char-count ${isExceeded ? 'count-red' : ''}`}>
            Characters: {post.length} / {limit}
          </span>
        </div>

        {/* Error Message when limit is exceeded */}
        {isExceeded && (
          <div className="error-message">
            Your post exceeds the {limit} character limit for {platform}.
          </div>
        )}

        {/* Post Action Button */}
        <div className="button-wrapper">
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
