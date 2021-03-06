RSpec.shared_context 'auth_user' do
  let!(:user) { create(:user) }

  before do
    allow(@controller).to receive(:current_user).and_return(user)
  end
end
