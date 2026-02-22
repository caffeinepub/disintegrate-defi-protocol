# Specification

## Summary
**Goal:** Integrate a wallet interface that displays ICP and Disintegrate token balances for authenticated users.

**Planned changes:**
- Add wallet component showing ICP and Disintegrate token balances side-by-side
- Implement backend query function to retrieve user's ICP balance from ledger canister
- Create React Query hook to fetch ICP balance from backend
- Restrict wallet UI to only show ICP and Disintegrate tokens

**User-visible outcome:** After authenticating with Internet Identity, users can view their ICP and Disintegrate token balances in a unified wallet interface that supports only these two tokens.
