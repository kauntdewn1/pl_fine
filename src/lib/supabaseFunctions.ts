import { supabase, supabaseAdmin } from './supabase';

export async function checkUserVip(email: string) {
  const { data, error } = await supabase
    .rpc('is_user_vip', { user_email: email });
  
  if (error) throw error;
  return data;
}

export async function checkUserAdmin(email: string) {
  const { data, error } = await supabase
    .rpc('is_user_admin', { user_email: email });
  
  if (error) throw error;
  return data;
}

export async function toggleLike(postId: string, userEmail: string) {
  const { data, error } = await supabase
    .rpc('toggle_post_like', { 
      p_post_id: postId, 
      p_user_email: userEmail 
    });
  
  if (error) throw error;
  return data;
}

export async function getPostStats(postId: string) {
  const { data, error } = await supabase
    .rpc('get_post_stats', { p_post_id: postId });
  
  if (error) throw error;
  return data;
}

export async function getVipPosts(userEmail: string, limit = 10, offset = 0) {
  const { data, error } = await supabase
    .rpc('get_vip_posts_with_like_status', { 
      p_user_email: userEmail,
      p_limit: limit,
      p_offset: offset
    });
  
  if (error) throw error;
  return data;
}

export async function checkTableStructure() {
  try {
    console.log('Verificando estrutura da tabela clientes_vip...');
    
    // Verificar se a tabela existe
    const { data: tableExists, error: tableError } = await supabaseAdmin
      .from('clientes_vip')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Erro ao verificar tabela:', tableError);
      return {
        exists: false,
        error: tableError.message
      };
    }

    // Verificar estrutura da tabela
    const { data: columns, error: columnsError } = await supabaseAdmin
      .rpc('get_table_info', { table_name: 'clientes_vip' });

    if (columnsError) {
      console.error('Erro ao verificar colunas:', columnsError);
      return {
        exists: true,
        error: columnsError.message
      };
    }

    console.log('Estrutura da tabela:', columns);
    return {
      exists: true,
      columns: columns
    };
  } catch (error) {
    console.error('Erro ao verificar estrutura:', error);
    return {
      exists: false,
      error: error.message
    };
  }
}

export async function debugAdminCheck(email: string) {
  try {
    console.log('=== Iniciando debug de verificação de admin ===');
    
    // 1. Verificar se o usuário está autenticado
    const { data: session } = await supabase.auth.getSession();
    console.log('Sessão atual:', session);

    // 2. Tentar buscar o registro direto
    const { data: adminData, error: adminError } = await supabase
      .from('clientes_vip')
      .select('*')
      .eq('email', email)
      .single();

    console.log('Resultado da busca:', { adminData, adminError });

    // 3. Verificar políticas
    const { data: policies, error: policiesError } = await supabaseAdmin
      .rpc('get_policies', { table_name: 'clientes_vip' });

    console.log('Políticas da tabela:', { policies, policiesError });

    return {
      session,
      adminData,
      adminError,
      policies,
      policiesError
    };
  } catch (error) {
    console.error('Erro no debug:', error);
    return { error };
  }
} 